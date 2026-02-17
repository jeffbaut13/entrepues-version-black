import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/components/common/MesasSelector.jsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// All silla ranges (0-indexed)
const sillaRanges = [
  { name: 'silla_0 (x4)', start: 48, end: 612, index: 0 },
  { name: 'silla_1 (x4)', start: 613, end: 1177, index: 1 },
  { name: 'silla_2 (x4)', start: 1178, end: 1742, index: 2 },
  { name: 'silla_3 (x4)', start: 1743, end: 2352, index: 3 },
  { name: 'silla_0 (x6)', start: 2353, end: 2917, index: 0 },
  { name: 'silla_1 (x6)', start: 2918, end: 3482, index: 1 },
  { name: 'silla_2 (x6)', start: 3483, end: 4064, index: 2 },
  { name: 'silla_3 (x6)', start: 4065, end: 4629, index: 3 },
  { name: 'silla_4 (x6)', start: 4630, end: 5194, index: 4 },
  { name: 'silla_5 (x6)', start: 5195, end: 5764, index: 5 },
];

// Collect all replacements
const allReplacements = [];
let totalStrokeOccurrences = 0;

for (const silla of sillaRanges) {
  let count = 0;
  
  for (let i = silla.start; i <= silla.end; i++) {
    if (lines[i].includes('stroke: strokeColor')) {
      // Build context: take 3 lines before and 3 lines after the target line
      const startIdx = Math.max(silla.start, i - 3);
      const endIdx = Math.min(silla.end, i + 3);
      
      const contextLines = [];
      for (let j = startIdx; j <= endIdx; j++) {
        contextLines.push(lines[j]);
      }
      
      // The target line is at relative index (i - startIdx)
      const relativeIndex = i - startIdx;
      
      // Replace in copy
      const newContextLines = contextLines.map((line, idx) => {
        if (idx === relativeIndex) {
          return line.replace('stroke: strokeColor', `stroke: getStrokeForSilla(${silla.index})`);
        }
        return line;
      });
      
      const oldString = contextLines.join('\n');
      const newString = newContextLines.join('\n');
      
      if (oldString !== newString && newString.includes(`getStrokeForSilla(${silla.index})`)) {
        allReplacements.push({
          filePath: 'src/components/common/MesasSelector.jsx',
          oldString,
          newString
        });
        count++;
        totalStrokeOccurrences++;
      }
    }
  }
  
  console.log(`${silla.name}: ${count} replacements`);
}

console.log(`\nTotal replacements: ${totalStrokeOccurrences}`);
console.log(`Will process in batches of 10`);

// Save to file
fs.writeFileSync('replacements.json', JSON.stringify({ replacements: allReplacements }, null, 2));
console.log(`Saved ${allReplacements.length} replacements to replacements.json`);
