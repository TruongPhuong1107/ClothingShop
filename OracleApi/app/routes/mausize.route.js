module.exports = app => {
    const mausize = require("../controllers/mausize.controller.js");
    app.get("/mau", mausize.findAllColor);
    app.get("/kichthuoc", mausize.findAllSize);
    
}