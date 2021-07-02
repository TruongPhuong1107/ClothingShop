module.exports = app => {
    const loai = require("../controllers/loai.controller.js"); 
    app.post("/loai", loai.create); 
    app.get("/loai", loai.findAll);
    app.get("/loai/:maloai", loai.findOne); 
    app.put("/loai/:maloai", loai.update); 
    app.delete("/loai/:maloai", loai.delete);
  };