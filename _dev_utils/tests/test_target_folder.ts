import { driveService } from "../../src/drive.service";
import { config } from "../../src/config";

async function testTargetFolder() {
  try {
    console.log("Config loaded defaultFolderId:", config.defaultFolderId);
    
    if (!config.defaultFolderId) {
      console.error("No defaultFolderId found in config!");
      return;
    }

    console.log(`Listing files in target folder (${config.defaultFolderId})...`);
    const result = await driveService.listFiles();
    
    console.log(`Found ${result.files?.length || 0} files in target folder.`);
    if (result.files && result.files.length > 0) {
      result.files.forEach(file => {
        console.log(`- ${file.name} (ID: ${file.id})`);
      });
    } else {
      console.log("Folder is empty or service account doesn't have access.");
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testTargetFolder();
