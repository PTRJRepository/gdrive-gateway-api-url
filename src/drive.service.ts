import { google } from "googleapis";
import { config } from "./config";
import { Readable } from "node:stream";

export class DriveService {
  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: config.serviceAccountPath,
      scopes: config.scopes,
    });

    this.drive = google.drive({ version: "v3", auth });
  }

  async uploadFile(file: File, folderId?: string) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const media = {
      mimeType: file.type,
      body: Readable.from(buffer),
    };

    const targetFolder = folderId || config.defaultFolderId;

    const response = await this.drive.files.create({
      requestBody: {
        name: file.name,
        parents: targetFolder ? [targetFolder] : undefined,
      },
      media: media,
      fields: "id, name, webViewLink, mimeType",
    });

    return response.data;
  }

  async downloadFile(fileId: string) {
    const response = await this.drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );
    return response.data;
  }

  async getFileMetadata(fileId: string) {
    const response = await this.drive.files.get({
      fileId,
      fields: "id, name, size, mimeType, createdTime, modifiedTime, webViewLink",
    });
    return response.data;
  }

  async listFiles(folderId?: string, pageToken?: string) {
    const targetFolder = folderId || config.defaultFolderId;
    const q = targetFolder ? `'${targetFolder}' in parents and trashed = false` : "trashed = false";
    const response = await this.drive.files.list({
      q,
      pageSize: 100,
      fields: "nextPageToken, files(id, name, size, mimeType, createdTime, modifiedTime)",
      pageToken,
    });
    return response.data;
  }

  async searchFiles(query: string) {
    const targetFolder = config.defaultFolderId;
    let q = `name contains '${query}' and trashed = false`;
    
    if (targetFolder) {
      q += ` and '${targetFolder}' in parents`;
    }

    const response = await this.drive.files.list({
      q,
      pageSize: 100,
      fields: "files(id, name, size, mimeType, createdTime, modifiedTime)",
    });
    return response.data;
  }

  async deleteFile(fileId: string) {
    await this.drive.files.delete({ fileId });
    return { success: true };
  }
}

export const driveService = new DriveService();
