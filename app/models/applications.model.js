const sql = require("./db");

// constructor
const Applications = function (apps) {
    this.desc_app = apps.desc_app;
    this.category = apps.category;
    this.developer = apps.developer;
    this.size_mb = apps.size_mb
};

Applications.create = (newApp, result) => {
    sql.query("INSERT INTO applications SET ?",
        newApp,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created new application: ", { id: res.insertId, ...newApp });
            result(null, { id: res.insertId, ...newApp });
        });
};

Applications.findById = (appId, result) => {
    sql.query(`SELECT * FROM applications WHERE id_app = ${appId}`,
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("Found application: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        });
};

Applications.getAll = result => {
    sql.query("SELECT * FROM applications",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("applications: ", res);
            result(null, res);
        });
};

Applications.updateById = (id, app, result) => {
    sql.query(
        "UPDATE applications SET desc_app = ?, category = ?, developer = ?, size_mb = ? WHERE id_app = ?",
        [app.desc_app, app.category, app.developer, app.size_mb, id],
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
            console.log("updated application: ", { id: id, ...app });
            result(null, { id: id, ...app });
        }
    );
};

Applications.remove = (id, result) => {
    sql.query("DELETE FROM applications WHERE id_app = ?", 
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
        console.log("application deleted. ID: ", id);
        result(null, res);
    });
};

Applications.removeAll = result => {
    sql.query("DELETE FROM applications", 
        function(err, res)  {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} applications`);
        result(null, res);
    });
};

module.exports = Applications;