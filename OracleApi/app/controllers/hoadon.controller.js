const hoadon = require("../models/hoadon.model.js");

function getOrderFromRec(req) {
  const cthd=[];
  var i;
  for(i = 0;i<req.body.cthd.length;i++){
    cthd[i]={
     masp:req.body.cthd[i].masp,
     mamau:req.body.cthd[i].mamau,
     makt:req.body.cthd[i].makt,
     soluong:req.body.cthd[i].soluong,
     dongia:req.body.cthd[i].dongia
    };
    cthd.push(cthd[i]);
  }
  console.log(req.body.cthd.length);
  const hd = {
    makh: req.body.makh,
    ngaylap: req.body.ngaylap,
    tongtien: req.body.tongtien,
    hoten: req.body.hoten,
    noigiao: req.body.noigiao,
    sdt: req.body.sdt,
    trangthai: req.body.trangthai,
    cthd: cthd
  };

  return hd;
}

  exports.create = async(req, res,next) => {
    try {
      let hoadons = getOrderFromRec(req);
      console.log(hoadons);
      hoadons = await hoadon.create(hoadons);
  
      res.status(201).json(hoadons);
    } catch (err) {
      next(err);
    }
  };
  async function findAll(req, res, next) {
    try {
      const rows = await hoadon.getAll();
      const page = req.query.page;
      const limit= req.query.limit;
      const starIndex=(page-1)*limit;
      const endIndex=page*limit;
      const returnBills=rows.slice(starIndex,endIndex);
     
            res.status(200).json(returnBills); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
      
     
      
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.findAll = findAll;

  exports.updateState = async (req, res,next) => {
    try {
      let hoadons={};
      hoadons.mahd =req.body.mahd ;
      hoadons.trangthai=req.body.trangthai;
      console.log(hoadons);
      hoadons = await hoadon.updateState(hoadons);
  
      if (hoadons !== null) {
        res.status(200).json(hoadons);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
};

exports.findOne = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.query.mahd, 10);
    console.log(context);
    const rows = await hoadon.getById(context);
 
    if (req.query.mahd) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } 
  } catch (err) {
    next(err);
  }
};
exports.findCustomerBill = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.query.makh, 10);
    console.log(context);
    const rows = await hoadon.getByCustomer(context);
 
   
        res.status(200).json(rows);
     
  } catch (err) {
    next(err);
  }
};
exports.delete = async(req, res,next) => {
    try {
      const id = parseInt(req.params.mahd, 10);
  
      const success = await hoadon.remove(id);
  
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  
  
};
exports.deleteAll = (req, res) => {
  
};