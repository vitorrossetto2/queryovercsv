const fs = require('fs');
const path = require('path');
const readline = require('readline');

const inputFilePath = path.join(__dirname, 'output.txt');
const outputFilePath = path.join(__dirname, 'output.csv');

// Create read and write streams
const readStream = fs.createReadStream(inputFilePath, 'utf8');
const writeStream = fs.createWriteStream(outputFilePath);

// Write the CSV header
writeStream.write('id,name,age,creationDate\n');

// Use readline to process the input file line by line
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity, // Handle all newline variations
});

let isFirstLine = true;

rl.on('line', (line) => {
  if (isFirstLine) {
    isFirstLine = false; // Skip the header
    return;
  }

  const id = line.slice(0, 8).trim();
  const name = line.slice(8, 20).trim();
  const age = line.slice(20, 24).trim();
  const creationDate = line.slice(24, 36).trim();

  // Write the transformed line to the output CSV
  writeStream.write(`${id},${name},${age},${creationDate}\n`);
});

rl.on('close', () => {
  console.log('CSV file generated at', outputFilePath);
});

rl.on('error', (err) => {
  console.error('Error while reading the file:', err);
});

writeStream.on('error', (err) => {
  console.error('Error while writing to the file:', err);
});
