const User = require('../models/user.model.js');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    mail: req.body.mail,
    password: req.body.password,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.'
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating User with id ' + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete User with id ' + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
