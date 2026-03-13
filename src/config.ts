import path from "node:path";
import fs from "node:fs";

const accountInfo = JSON.parse(fs.readFileSync(path.resolve(import.meta.dir, "../_services_account/account.json"), "utf-8"));
const targetFolderUrl = accountInfo.target_folder;
const folderIdMatch = targetFolderUrl?.match(/\/folders\/([a-zA-Z0-9_-]+)/);
const defaultFolderId = folderIdMatch ? folderIdMatch[1] : null;

export const config = {
  serviceAccountPath: path.resolve(import.meta.dir, "../_services_account/secret_key.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
  port: process.env.PORT || 5178,
  defaultFolderId,
};
