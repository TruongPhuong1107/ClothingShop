module.exports = app => {
    const mausize = require("../controllers/mausize.controller.js");
  
    // Create a new Customer

    app.get("/mau", mausize.findAllColor);
    app.get("/kichthuoc", mausize.findAllSize);
    
}