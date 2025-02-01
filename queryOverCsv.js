const { DuckDBInstance } = require('@duckdb/node-api');

async function main() {
  const instance = await DuckDBInstance.create();
  const connection = await instance.connect();

  const readerCount = await connection.runAndReadAll(
    `SELECT count(*)
     FROM 'output.csv' where age > 90;`
  );
  console.table(readerCount.getRows());

  const readerLike = await connection.runAndReadAll(
    `SELECT name
     FROM 'output.csv' where name like 'a%';`
  );
  console.table(readerLike.getRows());

}

main().catch(console.error);
