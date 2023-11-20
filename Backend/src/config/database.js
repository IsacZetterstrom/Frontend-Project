import mysql2 from "mysql2/promise";
import "dotenv/config";

const connection = mysql2.createPool({
  host: "161.97.144.27",
  port: "8003",
  user: "root",
  password: process.env.PASSWORD,
  database: "cinema",
  multipleStatements: true,
  timezone: "+00:00",
});

await connection.getConnection((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection to database established");
  }
});

export default connection;
