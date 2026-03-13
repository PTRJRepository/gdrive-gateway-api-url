# Gdrive Gateway

API Gateway untuk upload, retrieve, read, dan search file di Google Drive menggunakan Service Account. Dibangun menggunakan **Bun** dan **Elysia**.

## Fitur

- **Upload File**: Mengunggah file ke Google Drive (opsional ke folder tertentu).
- **List Files**: Menampilkan daftar file di Google Drive dengan dukungan pagination.
- **Get Metadata**: Mengambil metadata detail dari suatu file.
- **Download File**: Mengunduh file secara langsung melalui gateway.
- **Search Files**: Melakukan pencarian file berdasarkan nama.
- **Delete File**: Menghapus file dari Google Drive.

## Persyaratan

- [Bun](https://bun.sh/) terinstal.
- Google Service Account key (`secret_key.json`) di dalam folder `_services_account/`.

## Instalasi

```bash
bun install
```

## Cara Menjalankan

### Mode Development
```bash
bun dev
```

### Mode Production
```bash
bun start
```

Default port adalah `3000`.

## API Endpoints

### 1. Upload File
`POST /upload`
- Body (Multipart Form Data):
  - `file`: File yang akan diunggah.
  - `folderId` (optional): ID folder tujuan di GDrive.

### 2. List Files
`GET /files`
- Query Params:
  - `folderId` (optional): Filter berdasarkan parent folder.
  - `pageToken` (optional): Token untuk pagination.

### 3. Get Metadata
`GET /files/:fileId`

### 4. Download File
`GET /download/:fileId`

### 5. Search Files
`GET /search?q=query_string`

### 6. Delete File
`DELETE /files/:fileId`

## Testing

Beberapa script testing tersedia di `_dev_utils/tests/`:

```bash
bun test:connection  # Test koneksi ke GDrive
bun test:upload      # Test upload & delete
bun test:search      # Test pencarian
bun test:download    # Test upload, download, & compare
```

## Struktur Project

- `src/index.ts`: Entry point Elysia server.
- `src/drive.service.ts`: Wrapper untuk Google Drive API.
- `src/config.ts`: Konfigurasi aplikasi.
- `_services_account/`: Tempat menyimpan kredensial service account.
- `_dev_utils/tests/`: Script untuk verifikasi fungsionalitas.
