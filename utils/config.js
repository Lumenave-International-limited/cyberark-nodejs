import dotenv from "dotenv";
dotenv.config();

module.exports = {
  // development: {
  //   username: "<your-database-username>",
  //   password: "<your-database-password>",
  //   database: "<your-database-name>",
  //   host: "localhost",
  //   dialect: "postgres",
  // },

  databaseUrl: process.env.DATABASE_URL,
};
