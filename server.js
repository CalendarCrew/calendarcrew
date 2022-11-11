const express = require("express");
const cors = require("cors");
const db = require("./src/models");

const app = express();

 let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


const PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
    app.listen(PORT,() => {
        console.log(`Server running on port ${process.env.PORT}...`)
    })
})