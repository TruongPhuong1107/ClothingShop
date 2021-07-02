module.exports = app => {
const hoadon = require("../controllers/hoadon.controller.js");
app.post("/hoadon", hoadon.create);
app.get("/hoadon", hoadon.findAll);
app.get("/khachhang/hoadon", hoadon.findCustomerBill);
app.get("/hoadons", hoadon.findOne);
app.put("/hoadons", hoadon.updateState);
app.delete("/hoadons/:mahd", hoadon.delete);
app.delete("/hoadon", hoadon.deleteAll);
};