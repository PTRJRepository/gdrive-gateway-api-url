# Architecture: Google Drive Gateway

Dokumen ini menjelaskan desain sistem dan aliran data dari Google Drive Gateway.

## 1. System Overview

Gateway ini bertindak sebagai perantara (proxy) antara aplikasi internal dan Google Drive API. Tujuannya adalah untuk menyederhanakan interaksi dengan Google Drive, menangani autentikasi secara terpusat, dan mengisolasi akses hanya pada folder tertentu yang ditentukan sebagai "Root".

## 2. Komponen Utama

- **Bun Runtime**: Runtime JavaScript/TypeScript yang sangat cepat yang digunakan untuk menjalankan server.
- **ElysiaJS**: Web framework yang digunakan untuk membangun REST API yang efisien dengan performa tinggi.
- **Google Drive API (v3)**: Layanan penyimpanan cloud yang menjadi backend fisik.
- **Service Account**: Mekanisme autentikasi menggunakan file JSON (`secret_key.json`) yang memungkinkan aplikasi mengakses Drive tanpa interaksi user manual (OAuth2 flow).

## 3. Struktur Folder Konseptual

Gateway ini menerapkan konsep "Virtual Root":
- **Default Root**: ID Folder yang ditentukan di `_services_account/account.json`.
- **Scope Isolation**: Semua operasi `list` dan `search` dibatasi hanya pada folder ini dan anak-anaknya.

## 4. Aliran Data (Data Flow)

### A. Alur Upload
1. Client mengirimkan file melalui `POST /upload` (Multipart).
2. Gateway menerima file dan mengubahnya menjadi stream.
3. Gateway menambahkan metadata `parents` (Root Folder ID dari config).
4. Gateway mengirimkan data ke Google Drive API menggunakan kredensial Service Account.
5. Gateway mengembalikan File ID dan Link ke Client.

### B. Alur Download (Streaming)
1. Client meminta file melalui `GET /download/:fileId`.
2. Gateway meminta stream data dari Google Drive.
3. Gateway meneruskan stream tersebut langsung ke Client (piping).
4. Keuntungan: Gateway tidak menyimpan file di disk lokal, menghemat memori dan meningkatkan keamanan.

### C. Alur Pencarian
1. Client mengirim query melalui `GET /search?q=...`.
2. Gateway membangun query GDrive: `name contains '...' and 'ROOT_ID' in parents`.
3. GDrive mengembalikan daftar file yang relevan hanya dalam scope tersebut.

## 5. Keamanan
- **No Public Access**: File di GDrive tidak perlu di-set public. Hanya Service Account yang membutuhkan akses "Editor" ke folder target.
- **Credential Isolation**: Kredensial disimpan di folder `_services_account/` yang harus di-exclude dari source control.
