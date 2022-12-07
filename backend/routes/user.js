const express = require("express");

//importation du middleware password
const password = require("../middleware/password");
//importation de ma fonction signup de mon dossier controllers/user.js
const userControllers = require("../controllers/user");
console.log("CONTROLL --->userControllers");
console.log(userControllers);
//On importe la fonction router de express
const router = express.Router();

//la route signup
router.post("/register", password, userControllers.signup);

//la route login
router.post("/login", userControllers.login);

//exportation du module
module.exports = router;
