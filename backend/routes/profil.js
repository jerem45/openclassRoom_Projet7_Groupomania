const express = require("express");

//importation du middleware password
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//importation de ma fonction signup de mon dossier controllers/user.js
const userCrud = require("../controllers/profil");
//On importe la fonction router de express
const router = express.Router();

//Crud user profil
router.post("/", auth,multer, userCrud.createUser);
router.get("/", auth, userCrud.getAllUser);
router.get("/:id", auth, userCrud.getOneUser);
router.put("/:id", auth,multer, userCrud.modifUser);
router.delete("/:id", auth, userCrud.deleteUser);

//route test avec postman
router.post('/upload', multer, (req, res) => {
res.send()
})
//exportation du module
module.exports = router;
