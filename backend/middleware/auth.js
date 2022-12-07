// Ajout des packages suplémentaires
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Création des tokens d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    //decoder le token
    const decodedToken = jwt.verify(token, `${process.env.JSON_WEB_TOKEN_KEY}`);
    const userId = decodedToken.userId;
    console.log("_______________________>userId");
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw "userId non valide"; // si le token ne correspond pas au userId : erreur
    } else {
      console.log("le token est valide");
      next(); // si tout est valide on passe au prochain middleware
    }
  } catch (error) {
    // probleme d'autentification si erreur dans les inscrutions
    res.status(401).json({
      error: error | "Requête non authentifiée !",
    });
  }
};
