const mongoose = require("mongoose");
require("dotenv").config();

// conexion a la BASE DE DATOS
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));
