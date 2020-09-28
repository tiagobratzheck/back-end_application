const Sales = require("../models/sales.models");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const sale = new Sales({
        date_sales: req.body.date_sales,
        id_app: req.body.id_app,        
    });

    Sales.create(sale, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating application."
            });
        else res.send(data);
    });

};


exports.findAll = (req, res) => {
    Sales.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving applications."
            });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Sales.findById(req.params.saleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Sales not found with this id ${req.params.saleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error with this sale. ID: " + req.params.saleId
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

    Sales.updateById(
        req.params.saleId,
        new Sales(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Application not found with this id ${req.params.saleId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Application with some error, id " + req.params.saleId
                    });
                }
            } else res.send(data);
        }
    );
};


exports.delete = (req, res) => {
    Sales.remove(req.params.saleId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Sales not found with this id ${req.params.saleId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete sale with id " + req.params.saleId
            });
          }
        } else res.send({ message: `Sales was deleted successfully!` });
      });
};


exports.deleteAll = (req, res) => {
    Sales.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred..."
          });
        else res.send({ message: `All sales deleted.` });
      });
};