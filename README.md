# queryovercsv

This project is designed to generate a positional file, convert it to CSV format, and then use DuckDB to query over the large CSV file with millions of rows.

## Overview

1. **Generate Positional File**: The `generateFile.js` script generates a large positional file with a specified number of records.
2. **Convert to CSV**: The `convertToCsv.js` script converts the generated positional file to CSV format.
3. **Query Over CSV**: The `queryOverCsv.js` script uses DuckDB to query the large CSV file.

## Usage

### Step 1: Generate Positional File

Run the `generateFile.js` script to generate a positional file named `output.txt` with the desired number of records.

```sh
node generateFile.js
```

###

### Step 2: Convert to CSV

Run the `convertToCsv.js` script to convert the `output.txt` file to `output.csv.`

```sh
node convertToCsv.js
```

### Step 3: Query Over CSV

Run the `queryOverCsv.js` script to query the `output.csv` file using DuckDB.

### Dependencies

@duckdb/node-api: DuckDB Node.js API for querying the CSV file.
readline: Node.js module for reading the positional file line by line.

Install the dependencies using npm:

```sh
npm install
```