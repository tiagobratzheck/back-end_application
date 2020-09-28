module.exports = app => {
    const sales = require("../controllers/sales.controller");
      
    app.post("/sales", sales.create);
  
    app.get("/sales", sales.findAll);
  
    app.get("/sales/:saleId", sales.findOne);
  
    app.put("/sales/:saleId", sales.update);
      
    app.delete("/sales/:saleId", sales.delete);
  
    app.delete("/sales", sales.deleteAll);

  };