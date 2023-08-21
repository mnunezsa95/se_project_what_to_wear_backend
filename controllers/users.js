const User = require("../models/user"); // import user model

module.exports.getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(500).send(users))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error" });
    });
};

module.exports.getUser = (req, res) => {
  console.log(req);
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error" });
    });
};

module.exports.createUser = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error" });
    });
};
