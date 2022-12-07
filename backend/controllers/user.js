//importation de bcrypte pour hash mdp
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
const dotenv = require("dotenv");
result = dotenv.config();

//importation models de la base de données
const User = require("../models/User");
console.log("CONTROLL --->user");
console.log(User);

//signup pour enregistrer le nouvelle utilisateur dans la base de données
//Importantun peut aussi exporter des fonctions avec la exports

exports.signup = (req, res, next) => {
  console.log("CONTROL--->req.body");
  console.log(req.body);

  //chiffrement de l'adresse email
  const emailCryptoJs = req.body.email;
  console.log("contenu : ------------>emailCryptoJs");
  console.log(emailCryptoJs);

  //hash le mdp avant de l'envoyer a la base de donnée mongoDB
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //cree une nouvelle instance de user ou on recup l'email et le mdp
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });
      console.log("CONTROL USER------------->CONTROLLERS");
      console.log(user);
      //utilise la method "save" pour enregistrer dans la db

      user
        .save()
        .then(() =>
          res.status(201).json({ message: "utilisateur crée et sauvegarder" })
        )
        .catch((error) => res.status(400).json({ error }).send());
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};

//le login pours'authentifier
exports.login = (req, res, next) => {
  //le contenu de  la requête
  console.log("CONTROL Login--->req.body");
  console.log(req.body);

  //chiffrement de l 'adresse email
  const emailCryptoJs = req.body.email;
  console.log("contenu : ------------>emailCryptoJs");
  console.log(emailCryptoJs);

  //chercher l'email dans la base de donnée
  User.findOne({ email: emailCryptoJs })

    //si le user n'est pas present dans la base de donnée
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: "utilisateur absent de la base de donnée" });
      }
      //controler la validité du password envoyer par le front
      bcrypt
        .compare(req.body.password, user.password)
        .then((controlPassword) => {
          console.log("CONTROL PASWORD");
          console.log(controlPassword);

          //si le mdp est incorrect
          if (!controlPassword) {
            return res
              .status(401)
              .json({ message: "mot de passe incorrecte " });
          }

          //si le mdp est correct
          res.status(201).json({
            userId: user._id,
            token: jwt.sign(
              //3arguments
              {
                userId: user._id,
              },
              `${process.env.JSON_WEB_TOKEN_KEY}`,
              { expiresIn: "12h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
