import dotenv from "dotenv";
dotenv.config();

// console.log(process.env);

import { Sequelize } from "sequelize";

// With Provisioned Database
const sequelize = new Sequelize(process.env.DATABASE_URL);

// With Local Database

// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USERNAME,
//   process.env.PASSWORD,
//   { dialect: "postgres", host: process.env.HOST }
// );

// module.exports = sequelize;
export default sequelize;
