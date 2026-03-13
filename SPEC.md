# Google Drive Gateway - Specification

## Project Overview
- **Project Name**: Gdrive Gateway
- **Project Type**: File Management Gateway (CLI + API)
- **Core Functionality**: Upload, retrieve, read, and search files on Google Drive using a service account
- **Target Users**: Developers and system administrators who need programmatic access to Google Drive

## Technical Stack
- **Language**: Python 3.10+
- **Framework**: FastAPI (for REST API), Click (for CLI)
- **Google API**: google-api-python-client, google-auth
- **Configuration**: YAML-based config

## Functionality Specification

### Core Features

#### 1. File Upload
- Upload single file to Google Drive
- Support any file type (documents, images, videos, etc.)
- Optional: specify folder ID for organized storage
- Return file ID and web view link after upload

#### 2. File Retrieve/Download
- Download file by file ID
- Download file by file name (search first)
- Support for converting Google Docs to export formats (PDF, DOCX, etc.)

#### 3. File Read/List
- List all files in root or specific folder
- List files with pagination support
- Get file metadata (name, size, created date, modified date, mime type)

#### 4. File Search
- Search files by name (partial match)
- Search files by mime type
- Search files within specific folder
- Full-text search support

### API Endpoints

```
POST /upload          - Upload a file
GET  /file/{file_id}  - Get file metadata
GET  /download/{file_id} - Download file
GET  /files            - List files (with optional folder_id, page_token)
GET  /search           - Search files (query, mime_type, folder_id)
DELETE /file/{file_id} - Delete file
```

### CLI Commands

```
gdrive-gateway upload <file_path> [--folder-id <folder_id>]
gdrive-gateway list [--folder-id <folder_id>] [--page-size <size>]
gdrive-gateway get <file_id>
gdrive-gateway download <file_id> [--output <path>]
gdrive-gateway search <query> [--mime-type <type>]
gdrive-gateway delete <file_id>
```

## Project Structure

```
Upload_Read_Gdrive_Gateway/
├── _services_account/
│   ├── account.json        # Service account config
│   └── secret_key.json    # Private key
├── config/
│   └── config.yaml         # Application config
├── src/
│   ├── __init__.py
│   ├── main.py             # FastAPI app
│   ├── config.py           # Configuration loader
│   ├── service/
│   │   ├── __init__.py
│   │   └── drive_service.py  # Google Drive API wrapper
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py      # Pydantic models
│   └── routers/
│       ├── __init__.py
│       └── files.py        # API routes
├── cli.py                  # CLI entry point
├── requirements.txt
└── README.md
```

## Acceptance Criteria

1. **Upload**: Successfully upload any file type to Google Drive and receive file ID
2. **Download**: Successfully download file by ID to local filesystem
3. **List**: List all files with pagination support
4. **Search**: Search files by name with partial matching
5. **Metadata**: Retrieve file metadata (name, size, dates, type)
6. **Error Handling**: Proper error messages for authentication failures, file not found, etc.
7. **Service Account**: Use service account from _services_account directory

## Configuration

```yaml
# config/config.yaml
service:
  account_file: "_services_account/account.json"
  secret_key_file: "_services_account/secret_key.json"

drive:
  root_folder_id: null  # Optional: set root folder ID
  page_size: 100

app:
  host: "0.0.0.0"
  port: 8000
```
