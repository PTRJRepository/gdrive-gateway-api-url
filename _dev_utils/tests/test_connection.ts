import { driveService } from "../../src/drive.service";

async function testConnection() {
  try {
    console.log("Testing connection to Google Drive...");
    const files = await driveService.listFiles();
    console.log("Connection successful!");
    console.log(`Found ${files.files?.length || 0} files.`);
    if (files.files && files.files.length > 0) {
      console.log("First file:", files.files[0].name);
    }
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();
