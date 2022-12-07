//APP.JS Gére toutes les requêtes envoyés par le serveur
//importation d'express
const express = require("express");
const cors = require("cors");

//Importation de morgane pour les logger HTTP
const morgan = require("morgan");

const helmet = require("helmet");

//Importation de la liaison avec le fichier de a la base de donnée mongoose
const mongoose = require("./db/db");
const path = require("path");

//Importation des routes
const userRoutes = require("./routes/user");
const profilRoutes = require("./routes/profil");
const postRoutes = require("./routes/post");

//pour créé une app express
const app = express();

//Importation de body-parser doit être mis apres express()
const bodyParser = require("body-parser");

//logger les req et les res
app.use(morgan("dev"));

//debug mongoose
console.log("-------->MONGOOOSE DEBUG");
mongoose.set("debug", true);

//Geré les probléme de cors partage des ressources entre origine multiple
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//Transformer le corps du body en json exploitable
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());
// Gestion de la ressource image en statique
app.use('/images', express.static(path.join(__dirname, 'images')));
//la route d'authentification

app.use("/api/auth", userRoutes);

//la route fiche profil
app.use("/api/profil", profilRoutes);

//la route fiche post
app.use("/api/post", postRoutes);

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})
//exportation de app.js
module.exports = app;
