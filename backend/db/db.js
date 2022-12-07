const mongoose = require("mongoose");
//Importer l'utilisation des variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//connection a la base de donnée de façon securiser grace au variable d'environement
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ACCESS}.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connection à la base de donnée réussie !");
  })
  .catch(() => {
    console.log("connection échoué");
  });

module.exports = mongoose;
