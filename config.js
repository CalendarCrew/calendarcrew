module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: null,
    DB: "events",
    dialect: "mysql",
    pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 100000
    }
  };
