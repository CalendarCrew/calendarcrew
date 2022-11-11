// const express = require("express");
// const cors = require("cors");
// const db = require("./src/models");

// const app = express();

//  let corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the CalendarCrew application." });
// });


// const PORT = process.env.PORT || 8080;
// db.sequelize.sync().then(() => {
//     app.listen(PORT,() => {
//         console.log(`Server running on port ${process.env.PORT}...`)
//     })
// })


const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));