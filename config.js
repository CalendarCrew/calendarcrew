module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345",
    DB: "events",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 100000
    }
  };