//------------------------------Crud User-----------------------------------------

const User = require("../models/Post");
const fs = require("fs");

// const User = db.User;
exports.createPost = (req, res, next) => {
  // console.log("req.body");
  // console.log(req.body);
  const userData = req.body;
  const userUser = JSON.parse(JSON.stringify(userData));

  const userInfo = new User({
    ...userUser,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file}`,
  });
  // console.log("userUser");
  // console.log(userUser);

  userInfo
    .save()
    .then(() => {
      res.status(200).json({
        message: "User enregistré dans la base de données",
        contenu: req.body,
      });
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.getAllPost = (req, res, next) => {
  User.find()
    .select("-password")
    .then((allUser) => {
      res.status(200).json(allUser);
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.getOnePost = (req, res, next) => {
  // console.log("----------------->log de req ");
  // console.log(req.params.id);
  // console.log({ _id: req.params.id });

  User.findOne({ _id: req.params.id })
    .then((objet) => res.status(200).json(objet))
    .catch((error) => res.status(404).json({ error }));
};
exports.modifPost = (req, res, next) => {
  console.log("----------------->log de req modif ");
  console.log(req.params.id);
  console.log({ _id: req.params.id });
  console.log("req.body");
  console.log(req.body);
  const userData = req.body;
  const userModif = JSON.parse(JSON.stringify(userData));
  const userObject = req.file
    ? {
        ...userModif,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file}`,
      }
    : { ...userModif };

  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() =>
      res.status(200).json({
        message: "modif reussie",
      })
    )
    .catch((error) => res.status(404).json({ error }));
};
//--------------------------------------------------------------------

// exports.modifPost = (req, res, next) => {
// console.log("----------------req depuis controllers  modif----------------");
// console.log(req);
//   const userData = req.body;
//   const userModif = JSON.parse(JSON.stringify(userData));
//   const userObject = req.file
//     ? {
//         ...userModif
//       }
//     : { ...userModif };

//   User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
//     .then(() =>
//       res.status(200).json({
//         message: "modif reussie",
//       })
//     )
//     .catch((error) => res.status(404).json({ error }));
// };
//--------------------------------------------------------------------
exports.deletePost = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({
        message: "delete reussie",
      })
    )
    .catch((error) => res.status(404).json({ error }));
};

exports.likedPost = (req, res, next) => {
  switch (req.body.likes) {
    //Vérifie si lm'utilisateur a like ou dislike
    //mise a jour de la user ou envoyer message d'erreur
    case 0:
      User.findOne({ _id: req.params.id })
        .then((user) => {
          if (user.usersLiked.find((user) => user === req.body.userId)) {
            User.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => {
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
          if (user.usersDisliked.find((user) => user === req.body.userId)) {
            User.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(201).json({ message: "ok..." });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: error });
        });
      break;
    //si like = 1
    //maj User
    case 1:
      User.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() => {
          res.status(201).json({ message: "Like added!" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    //likes = -1
    //uptade the user, send message/error
    case -1:
      User.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() => {
          res.status(201).json({ message: "Ok... it's your right..." });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    default:
      console.error("Bad request");
  }
};

exports.dislikedPost = (req, res, next) => {
  switch (req.body.dislikes) {
    //Vérifie si lm'utilisateur a like ou dislike
    //mise a jour de la user ou envoyer message d'erreur
    case 0:
      User.findOne({ _id: req.params.id })
        .then((user) => {
          if (user.usersLiked.find((user) => user === req.body.userId)) {
            User.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => {
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
          if (user.usersDisliked.find((user) => user === req.body.userId)) {
            User.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(201).json({ message: "ok..." });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: error });
        });
      break;
    //si like = 1
    //maj User
    case 1:
      User.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() => {
          res.status(201).json({ message: "Like added!" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    //likes = -1
    //uptade the user, send message/error
    case -1:
      User.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { usersliked: req.body.userId },
          _id: req.params.id,
        }
      )
        .then(() => {
          res.status(201).json({ message: "Ok... it's your right..." });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    default:
      console.error("Bad request");
  }
};