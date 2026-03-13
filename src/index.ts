import { Elysia, t } from "elysia";
import { driveService } from "./drive.service";
import { config } from "./config";

const app = new Elysia()
  .get("/", () => ({ message: "Gdrive Gateway is running" }))
  
  // Upload a file
  .post("/upload", async ({ body }) => {
    const { file, folderId } = body;
    if (!file) throw new Error("No file uploaded");
    return await driveService.uploadFile(file, folderId);
  }, {
    body: t.Object({
      file: t.File(),
      folderId: t.Optional(t.String())
    })
  })

  // List files
  .get("/files", async ({ query }) => {
    const { folderId, pageToken } = query;
    return await driveService.listFiles(folderId, pageToken);
  }, {
    query: t.Object({
      folderId: t.Optional(t.String()),
      pageToken: t.Optional(t.String())
    })
  })

  // Get file metadata
  .get("/files/:fileId", async ({ params }) => {
    return await driveService.getFileMetadata(params.fileId);
  })

  // Download file
  .get("/download/:fileId", async ({ params, set }) => {
    const metadata = await driveService.getFileMetadata(params.fileId);
    const stream = await driveService.downloadFile(params.fileId);
    
    set.headers["Content-Type"] = metadata.mimeType || "application/octet-stream";
    set.headers["Content-Disposition"] = `attachment; filename="${metadata.name}"`;
    
    return stream;
  })

  // Search files
  .get("/search", async ({ query }) => {
    const { q } = query;
    if (!q) throw new Error("Search query is required");
    return await driveService.searchFiles(q);
  }, {
    query: t.Object({
      q: t.String()
    })
  })

  // Delete file
  .delete("/files/:fileId", async ({ params }) => {
    return await driveService.deleteFile(params.fileId);
  })

  .listen(config.port);

console.log(`🦊 Gdrive Gateway is running at ${app.server?.hostname}:${app.server?.port}`);
