module.exports = app => {
    const loai = require("../controllers/loai.controller.js");
  
    // Create a new Customer
    app.post("/loai", loai.create);
  
    // Retrieve all Customers
    app.get("/loai", loai.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/loai/:maloai", loai.findOne);
  
    // Update a Customer with customerIdni
    app.put("/loai/:maloai", loai.update);
  
    // Delete a Customer with customerId
    app.delete("/loai/:maloai", loai.delete);
  
    // Create a new Customer
    app.delete("/loai", loai.deleteAll);
  };