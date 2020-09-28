const sql = require("./db");

// constructor
const Sales = function (sale) {
    this.date_sales = sale.date_sales;
    this.id_app = sale.id_app   
};

Sales.create = (newSale, result) => {
    sql.query("INSERT INTO sales SET ?",
        newSale,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created new sale: ", { id: res.insertId, ...newSale });
            result(null, { id: res.insertId, ...newSale });
        });
};

Sales.findById = (saleId, result) => {
    sql.query(`SELECT * FROM sales WHERE id_app = ${saleId}`,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("Found sale: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
};

Sales.getAll = result => {
    sql.query("SELECT * FROM sales",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("Sales: ", res);
            result(null, res);
        });
};

Sales.updateById = (id, sale, result) => {
    sql.query(
        "UPDATE sales SET date_sales = ?, id_app = ? WHERE id_sales = ?",
        [sale.date_sales, sale.id_app, id],
        function(err, res)  {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {            
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated sale: ", { id: id, ...sale });
            result(null, { id: id, ...sale });
        }
    );
};

Sales.remove = (id, result) => {
    sql.query("DELETE FROM sales WHERE id_sales = ?", 
        id, 
        function(err, res)  {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {        
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("sale deleted. ID: ", id);
        result(null, res);
    });
};

Sales.removeAll = result => {
    sql.query("DELETE FROM sales", 
        function(err, res)  {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} Sales`);
        result(null, res);
    });
};

module.exports = Sales;