const express = require("express");

//importation du middleware password
const auth = require("../middleware/auth");

//importation de ma fonction signup de mon dossier controllers/user.js
const postCrud = require("../controllers/post");
//On importe la fonction router de express;
const router = express.Router();

//Crud user profil
router.post("/", auth, postCrud.createPost);
router.get("/", auth, postCrud.getAllPost);
router.get("/:id", auth, postCrud.getOnePost);
router.put("/:id", auth,postCrud.modifPost);
router.delete("/:id", auth, postCrud.deletePost);
router.post("/:id/like", auth, postCrud.likedPost);
router.post("/:id/dislike", auth, postCrud.dislikedPost);
//exportation du module
module.exports = router;
