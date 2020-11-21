// import the pg library
import pg from 'pg';

const { Client } = pg;

// set the way we will connect (configuration) to the server
const pgConnectionConfigs = {
  user: 'aljt',
  host: 'localhost',
  database: '3.5.2_postgresql',

  port: 5432, // Postgres server always runs on this port
};

// create a new instance of the client
const client = new Client(pgConnectionConfigs);

// make the connection to the server
client.connect();

// to store the SQL query so we can pass it as a parameter to client.query
let sqlQuery;

// create the query done callback
const whenQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log('error', error);
  } else {
    // rows key has the data
    console.log(result.rows);
  }

  // close the connection
  client.end();
};

// get the arguments in the command line
// create the sql query
// run the query using the client
if (process.argv[2] === 'all-dogs') {
  // write the SQL query that displays all the rows in dogs database
  sqlQuery = 'SELECT * from dogs';

  // run the SQL query
  client.query(sqlQuery, whenQueryDone);
} else if (process.argv[2]) {
  // create a var for the dog name
  const name = process.argv[2];
  const type = process.argv[3];
  const weight = process.argv[4];

  const values = [name, type, weight];

  // write the SQL query that inserts a new dog entry
  // sqlQuery = 'INSERT INTO dogs(name, type, weight) VALUES ($1, $2, $3)';
  sqlQuery = `INSERT INTO dogs(name, type, weight) VALUES ('${name}', '${type}', ${weight})`;

  console.log(sqlQuery);

  // run the SQL query
  // client.query(sqlQuery, values, whenQueryDone);
  client.query(sqlQuery, whenQueryDone);
}
