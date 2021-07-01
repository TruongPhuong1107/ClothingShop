module.exports = app => {
    const taikhoan = require("../controllers/taikhoan.controller.js");
  
    // Create a new Customer
    app.post("/taikhoan", taikhoan.create);
  
    // Retrieve all Customers
    app.get("/taikhoan", taikhoan.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/taikhoan/:matk", taikhoan.findOne);
  
    app.get("/CheckLogin", taikhoan.CheckLogin);

    app.put("/taikhoan/:matk", taikhoan.update);

    app.put("/admin/taikhoan", taikhoan.updateRole);
  
    // Delete a Customer with customerId
    app.delete("/taikhoan/:matk", taikhoan.delete);
  
    // Create a new Customer
    app.delete("/taikhoan", taikhoan.deleteAll);
  };