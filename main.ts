import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one word grandma would text about AI.
const word = "Canggih";

// Guard the brief: exactly one word, no spaces, no extra text.
if (word.trim() !== word || word.split(/\s+/).length !== 1) {
  throw new Error("entry must be exactly one word");
}
if (word.length !== 7) {
  throw new Error(`expected a 7-character word, got ${word.length}`);
}

// The grader gives us the output folder; fall back to /output.
// Only ever write under that folder, never under the repo itself.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, word, "utf8");

// Read it back and make sure it is exactly the word, nothing else.
const written = readFileSync(entryPath, "utf8");
if (written !== word) {
  throw new Error(`entry.txt mismatch: expected ${word}, got ${written}`);
}

console.log(`Wrote 1 word (${word.length} characters) to ${entryPath}: ${word}`);
