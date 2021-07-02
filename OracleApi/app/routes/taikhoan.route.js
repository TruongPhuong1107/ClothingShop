module.exports = app => {
    const taikhoan = require("../controllers/taikhoan.controller.js");
    app.post("/taikhoan", taikhoan.create);
    app.get("/taikhoan", taikhoan.findAll);
    app.get("/taikhoan/:matk", taikhoan.findOne); 
    app.get("/CheckLogin", taikhoan.CheckLogin);
    app.put("/taikhoan/:matk", taikhoan.update);
    app.put("/admin/taikhoan", taikhoan.updateRole);
    app.delete("/taikhoan/:matk", taikhoan.delete);
    app.delete("/taikhoan", taikhoan.deleteAll);
  };