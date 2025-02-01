const fs = require('fs');
const path = require('path');

// Function to generate a random string of a given length
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a random date within a range
function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to generate a random age between 18 and 99
function generateRandomAge() {
    return Math.floor(Math.random() * (99 - 18 + 1)) + 18;
}

// Function to generate a positional file in chunks
function generatePositionalFile(filePath, numRecords, chunkSize) {
    const header = 'ID       NAME          AGE  CREATIONDATE\n';
    const writeStream = fs.createWriteStream(filePath);

    // Write the header
    writeStream.write(header);

    let recordsWritten = 0;

    function writeChunk() {
        let chunk = '';
        for (let i = 0; i < chunkSize && recordsWritten < numRecords; i++) {
            const id = (recordsWritten + 1).toString().padEnd(8); // 8 characters for ID
            const name = generateRandomString(10).padEnd(12); // 12 characters for NAME
            const age = generateRandomAge().toString().padEnd(4); // 4 characters for AGE
            const creationDate = generateRandomDate(new Date(2000, 0, 1), new Date()).toISOString().split('T')[0].padEnd(12); // 12 characters for CREATIONDATE

            const record = `${id}${name}${age}${creationDate}\n`;
            chunk += record;
            recordsWritten++;
        }

        if (chunk) {
            writeStream.write(chunk);
        }

        if (recordsWritten < numRecords) {
            // Schedule the next chunk to be written
            setImmediate(writeChunk);
        } else {
            // Close the stream when done
            writeStream.end();
            console.log(`Positional file generated at ${filePath}`);
        }
    }

    // Start writing the first chunk
    writeChunk();
}

// Define the file path, number of records, and chunk size
const filePath = path.join(__dirname, 'output.txt');
const numRecords = 10000000; // Number of records to generate
const chunkSize = 100000; // Number of records to write in each chunk

// Generate the positional file
generatePositionalFile(filePath, numRecords, chunkSize);