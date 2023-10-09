import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  multipleStatements: true,
  timezone: "+00:00",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connection to database established");
  }
});
