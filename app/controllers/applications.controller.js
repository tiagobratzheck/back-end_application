const Applications = require("../models/applications.model");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const app = new Applications({
        desc_app: req.body.desc_app,
        category: req.body.category,
        developer: req.body.developer,
        size_mb: req.body.size_mb
    });

    Applications.create(app, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating application."
            });
        else res.send(data);
    });

};


exports.findAll = (req, res) => {
    Applications.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving applications."
            });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Applications.findById(req.params.appId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Application not found with this id ${req.params.appId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error with this application. ID: " + req.params.appId
                });
            }
        } else res.send(data);
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Applications.updateById(
        req.params.appId,
        new Applications(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Application not found with this id ${req.params.appId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Application with some error, id " + req.params.appId
                    });
                }
            } else res.send(data);
        }
    );
};


exports.delete = (req, res) => {
    Applications.remove(req.params.appId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Application not found with this id ${req.params.appId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete application with id " + req.params.appId
            });
          }
        } else res.send({ message: `Application was deleted successfully!` });
      });
};


exports.deleteAll = (req, res) => {
    Applications.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred..."
          });
        else res.send({ message: `All apps deleted.` });
      });
};