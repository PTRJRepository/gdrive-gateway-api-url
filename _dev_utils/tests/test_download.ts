import { driveService } from "../../src/drive.service";
import fs from "node:fs";
import { Readable } from "node:stream";

async function testDownload() {
  try {
    console.log("Testing file download...");
    const content = "Download test content " + Date.now();
    const fileName = "test_download.txt";
    
    // Create a File object
    const blob = new Blob([content], { type: "text/plain" });
    const file = new File([blob], fileName, { type: "text/plain" });

    console.log("Uploading temporary file...");
    const uploadResult = await driveService.uploadFile(file);
    const fileId = uploadResult.id;
    console.log("Uploaded file ID:", fileId);

    if (!fileId) throw new Error("Upload failed, no ID returned");

    console.log("Downloading file content...");
    const stream = await driveService.downloadFile(fileId) as Readable;
    
    let downloadedContent = "";
    for await (const chunk of stream) {
      downloadedContent += chunk.toString();
    }

    if (downloadedContent === content) {
      console.log("Download successful! Content matches.");
    } else {
      console.error("Download failed! Content mismatch.");
      console.error("Expected:", content);
      console.error("Got:", downloadedContent);
    }

    // Clean up
    console.log("Cleaning up test file from GDrive...");
    await driveService.deleteFile(fileId);
    console.log("Cleanup successful!");
  } catch (error) {
    console.error("Download test failed:", error);
  }
}

testDownload();
