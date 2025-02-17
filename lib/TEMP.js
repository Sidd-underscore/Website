// update-photos.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// For ES modules: define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv.length < 4) {
  console.error("Usage: node update-photos.js <inputFile> <outputFile>");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const fileContent = fs.readFileSync(inputFile, "utf8");
const lines = fileContent.split("\n");

// We'll build a mapping: oldFilename -> newFilename
const mapping = {};

// Simple helper to sanitize photo names
function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9]+/gi, "_");
}

// We assume that the photos array is defined with objects that span multiple lines.
// We'll look for lines that have: name: "...", date: <number>, and path: "/photography/<filename>".
// When we finish an object (when a line is "}," or "}" by itself), we compute the new filename.
let inPhoto = false;
let currentPhoto = {}; // holds properties for the current photo object

for (const line of lines) {
  const trimmed = line.trim();

  // Look for start of an object (assumes each photo object starts with a "{")
  if (trimmed.startsWith("{")) {
    inPhoto = true;
    currentPhoto = {};
  }
  if (inPhoto) {
    // Capture photo name
    const nameMatch = trimmed.match(/name:\s*"([^"]+)"/);
    if (nameMatch) {
      currentPhoto.name = nameMatch[1];
    }
    // Capture date (assumes a number)
    const dateMatch = trimmed.match(/date:\s*(\d+)/);
    if (dateMatch) {
      currentPhoto.date = dateMatch[1];
    }
    // Capture path – expecting: path: "/photography/<oldFilename>"
    const pathMatch = trimmed.match(/path:\s*"\/photography\/([^"]+)"/);
    if (pathMatch) {
      currentPhoto.oldFilename = pathMatch[1];
    }
  }
  // Detect end of a photo object (either "}," or "}" on its own)
  if (
    inPhoto &&
    (trimmed === "}," || trimmed === "}" || trimmed === "},")
  ) {
    if (currentPhoto.name && currentPhoto.date && currentPhoto.oldFilename) {
      const dateNum = Number(currentPhoto.date);
      const dateObj = new Date(dateNum * 1000);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const safeName = sanitizeFilename(currentPhoto.name);
      const oldFilename = currentPhoto.oldFilename;
      // Keep the suffix (everything from the first dot onward)
      const dotIndex = oldFilename.indexOf(".");
      const suffix = dotIndex !== -1 ? oldFilename.slice(dotIndex) : ".jpg";
      const newFilename = `${year}${month}${day}_${safeName}${suffix}`;
      mapping[oldFilename] = newFilename;
    }
    inPhoto = false;
    currentPhoto = {};
  }
}

// Now, update each line by replacing any occurrence of an old filename (e.g. in import or path strings)
// with its new filename.
const updatedLines = lines.map((line) => {
  let newLine = line;
  for (const [oldFilename, newFilename] of Object.entries(mapping)) {
    if (newLine.includes(oldFilename)) {
      newLine = newLine.split(oldFilename).join(newFilename);
    }
  }
  return newLine;
});

fs.writeFileSync(outputFile, updatedLines.join("\n"), "utf8");
console.log(`Updated file written to ${outputFile}`);
