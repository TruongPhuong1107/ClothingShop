const sanpham = require("../models/sanpham.model.js");

function getProductFromRec(req) {
  const chitietmau=[];
  var j=req.body.chitietmau.length;
  for(var i=0;i<j;i++){
    chitietmau[i]={mamau:req.body.chitietmau[i].mamau};
    chitietmau.push(chitietmau[i]);
  }
  console.log(req.body.chitietmau.length);
  const chitietkt=[];
  for(var i=0;i<req.body.chitietkt.length;i++){
    chitietkt[i]={makt:req.body.chitietkt[i].makt};
    chitietkt.push(chitietkt[i]);
  }

  const sp = {
    tensp: req.body.tensp,
    dongia: req.body.dongia,
    hinh: req.body.hinh,
    hinh_rong: req.body.hinh_rong,
    maloai: req.body.maloai,
    mota: req.body.mota,
    trangthai:req.body.trangthai,
    ngaylap:req.body.ngaylap,
    chitietmau: chitietmau,
    chitietkt: chitietkt
  };

  return sp;
}

  exports.create = async(req, res,next) => {
    try {
      let sanphams = getProductFromRec(req);
      console.log(sanphams);
      sanphams = await sanpham.create(sanphams);
  
      res.status(201).json(sanphams);
    } catch (err) {
      next(err);
    }
  };
  async function findAll(req, res, next) {
    try {
      
      const rows = await sanpham.getAll();
  
    const page = req.query.page;
    const limit= req.query.limit; 
    const starIndex=(page-1)*limit;
    const endIndex=page*limit;
    const returnProducts=rows.slice(starIndex,endIndex);
   
          res.status(200).json(returnProducts); 
    
    
      
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.findAll = findAll;

  async function findNew(req, res, next) {
    try {
      const rows = await sanpham.getNew();
      res.status(200).json(rows); 
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.findNew = findNew;

exports.findOne = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.params.masp, 10);
    const rows = await sanpham.getById(context);
 
    if (req.params.masp) {
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
exports.findAdminOne = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.params.masp, 10);
    const rows = await sanpham.getByIdAdmin(context);
 
    if (req.params.masp) {
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

exports.findCate = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.params.maloai, 10);
    console.log(context);
    const rows = await sanpham.getByIdCate(context);
      res.status(200).json(rows);
    
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res,next) => {
  try {
    const context = {};

    context.value = req.query.value;
    console.log(context);
    const rows = await sanpham.getBySearch(context);
      res.status(200).json(rows);
    
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res,next) => {
    try {
      let sanphams = getProductFromRec(req);
     console.log(sanphams);
      sanphams.masp = parseInt(req.params.masp, 10);
  
      sanphams = await sanpham.updateById(sanphams);
  
      if (sanphams !== null) {
        res.status(200).json(sanphams);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
};

// Delete a Customer with the specified customerId in the request
exports.delete = async(req, res,next) => {
    try {
      const id = parseInt(req.params.masp, 10);
  console.log(id);
      const success = await sanpham.remove(id);
  
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};