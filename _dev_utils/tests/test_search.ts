import { driveService } from "../../src/drive.service";

async function testSearch() {
  try {
    console.log("Testing file search...");
    const query = "YIELD"; // Confirmed existing file in target folder
    const result = await driveService.searchFiles(query);
    
    console.log(`Search results for "${query}":`);
    console.log(`Found ${result.files?.length || 0} files.`);
    
    if (result.files && result.files.length > 0) {
      result.files.forEach(file => {
        console.log(`- ${file.name} (ID: ${file.id})`);
      });
    }
  } catch (error) {
    console.error("Search failed:", error);
  }
}

testSearch();
