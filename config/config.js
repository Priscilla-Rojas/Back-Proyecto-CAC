module.exports = {
  secretKey: process.env.SECRET_KEY,
  tokenExpiresIn: '1h',
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
}