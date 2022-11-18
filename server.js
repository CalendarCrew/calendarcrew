// // const express = require("express");
// // const cors = require("cors");
// // const db = require("./src/models");

// // const app = express();

// //  let corsOptions = {
// //   origin: "http://localhost:8081"
// // };

// // app.use(cors(corsOptions));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));


// // app.get("/", (req, res) => {
// //   res.json({ message: "Welcome to the CalendarCrew application." });
// // });


// // const PORT = process.env.PORT || 8080;
// // db.sequelize.sync().then(() => {
// //     app.listen(PORT,() => {
// //         console.log(`Server running on port ${process.env.PORT}...`)
// //     })
// // })


// const express = require('express');
// const cors = require('cors')
// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use('/login', (req, res) => {
//   res.send({
//     token: 'test'
//   });
// });

// app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

const { db } = require("./src/models");
const app = require("./api");

const PORT = process.env.PORT || 8080;

const init = async () => {
  try {
    await db.sync();

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error)
  }
};

init();
