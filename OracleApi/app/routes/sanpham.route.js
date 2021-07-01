module.exports = app => {
    const sanpham = require("../controllers/sanpham.controller.js");
  
    // Create a new Customer

    app.get("/sanpham", sanpham.findAll);

    app.get("/sanphammoi", sanpham.findNew);
    
    app.post("/sanpham", sanpham.create);
    app.get("/search", sanpham.search)
    app.get("/sanpham/:masp", sanpham.findOne);
    app.get("/admin/sanpham/:masp", sanpham.findAdminOne);
    app.get("/sanphamLoai/:maloai", sanpham.findCate);
    app.put("/sanpham/:masp", sanpham.update);
  
    app.delete("/sanpham/:masp", sanpham.delete);
  };