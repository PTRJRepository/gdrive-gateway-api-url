# API Reference: Gdrive Gateway

Daftar endpoint lengkap dengan parameter dan format data.

## 1. Upload File
`POST /upload`

Mengunggah file ke Google Drive Root yang telah dikonfigurasi.

**Request Body (form-data):**
- `file` (File, Required): File fisik yang akan diunggah.
- `folderId` (String, Optional): ID folder spesifik jika ingin mengunggah ke sub-folder tertentu. Jika kosong, akan menggunakan Root Folder default.

**Response:**
```json
{
  "id": "1abc...",
  "name": "filename.pdf",
  "mimeType": "application/pdf",
  "webViewLink": "https://..."
}
```

## 2. List Files
`GET /files`

Mengambil daftar file yang ada di dalam Root Folder.

**Query Parameters:**
- `folderId` (String, Optional): Lihat isi folder tertentu.
- `pageToken` (String, Optional): Token untuk halaman berikutnya (jika file > 100).

**Response:**
```json
{
  "files": [
    {
      "id": "1abc...",
      "name": "file.txt",
      "size": "1024",
      "mimeType": "text/plain",
      "createdTime": "2024-01-01...",
      "modifiedTime": "2024-01-01..."
    }
  ],
  "nextPageToken": "..."
}
```

## 3. Search Files
`GET /search`

Mencari file berdasarkan nama di dalam Root Folder.

**Query Parameters:**
- `q` (String, Required): Kata kunci pencarian.

**Response:**
Sama seperti `GET /files`.

## 4. Get Metadata
`GET /files/:fileId`

Mendapatkan detail metadata dari satu file secara spesifik.

**Path Parameters:**
- `fileId` (String): ID file di Google Drive.

**Response:**
```json
{
  "id": "...",
  "name": "...",
  "size": "...",
  "mimeType": "...",
  "createdTime": "...",
  "modifiedTime": "...",
  "webViewLink": "..."
}
```

## 5. Download File
`GET /download/:fileId`

Mengunduh file secara langsung. Endpoint ini mengembalikan binary stream.

**Path Parameters:**
- `fileId` (String): ID file di Google Drive.

**Headers:**
- `Content-Disposition`: attachment; filename="..."
- `Content-Type`: [MimeType File]

## 6. Delete File
`DELETE /files/:fileId`

Menghapus file dari Google Drive secara permanen.

**Path Parameters:**
- `fileId` (String): ID file di Google Drive.

**Response:**
```json
{
  "success": true
}
```
