module.exports = app => {
    const applications = require("../controllers/applications.controller");
      
    app.post("/applications", applications.create);
  
    app.get("/applications", applications.findAll);
  
    app.get("/applications/:appId", applications.findOne);
  
    app.put("/applications/:appId", applications.update);
      
    app.delete("/applications/:appId", applications.delete);
  
    app.delete("/applications", applications.deleteAll);

  };