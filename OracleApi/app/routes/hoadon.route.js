module.exports = app => {
    const hoadon = require("../controllers/hoadon.controller.js");
  
    // Create a new Customer
    app.post("/hoadon", hoadon.create);
  
    // Retrieve all Customers
    app.get("/hoadon", hoadon.findAll);
    app.get("/khachhang/hoadon", hoadon.findCustomerBill);
  
    // Retrieve a single Customer with customerId
    app.get("/hoadons", hoadon.findOne);

    app.put("/hoadons", hoadon.updateState);
    
    // Delete a Customer with customerId
    app.delete("/hoadons/:mahd", hoadon.delete);
  
    // Create a new Customer
    app.delete("/hoadon", hoadon.deleteAll);
  };