import { driveService } from "../../src/drive.service";
import fs from "node:fs";

async function testUpload() {
  try {
    console.log("Testing file upload...");
    const filePath = "test_upload.txt";
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: "text/plain" });
    const file = new File([blob], "test_upload.txt", { type: "text/plain" });

    const result = await driveService.uploadFile(file);
    console.log("Upload successful!");
    console.log("File ID:", result.id);
    console.log("File Name:", result.name);
    
    // Clean up
    console.log("Cleaning up test file from GDrive...");
    if (result.id) {
      await driveService.deleteFile(result.id);
      console.log("Cleanup successful!");
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

testUpload();
