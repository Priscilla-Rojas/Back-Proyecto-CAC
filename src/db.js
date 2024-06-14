import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'mydb',
  user: 'myuser',
  password: 'mypass',
  host: 'localhost',
  port: 3306,
});

