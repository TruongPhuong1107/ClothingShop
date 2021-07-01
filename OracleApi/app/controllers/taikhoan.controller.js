const taikhoan = require("../models/taikhoan.model.js");

// Create and Save a new Customer
function getAccountFromRec(req) {
  const tk = {
    tenchutk: req.body.tenchutk,
    sdt: req.body.sdt,
    email: req.body.email,
    diachi: req.body.diachi,
    ngaysinh: req.body.ngaysinh,
    tendn: req.body.tendn,
    matkhau: req.body.matkhau,
    role_id: req.body.role_id
  };

  return tk;
}
function getUpdateAccountFromRec(req) {
  const tkUpdate = {
    tenchutk: req.body.tenchutk,
    sdt: req.body.sdt,
    email: req.body.email,
    diachi: req.body.diachi,
    ngaysinh: req.body.ngaysinh
  };

  return tkUpdate;
}
exports.create = async(req, res,next) => {
  try {
    let taikhoans = getAccountFromRec(req);

    taikhoans = await taikhoan.create(taikhoans);

    res.status(201).json(taikhoans);
  } catch (err) {
    next(err);
  }
};

// Retrieve all Customers from the database.
  async function findAll(req, res, next) {
    try {
      const context = {};
  
      context.id = parseInt(req.params.id, 10);
  
      const rows = await taikhoan.getAll();
  
      if (req.params.id) {
        if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.findAll = findAll;

// Find a single Customer with a customerId

exports.findOne = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.params.matk, 10);
    const rows = await taikhoan.getById(context);
 
    if (req.params.matk) {
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
exports.CheckLogin = async (req, res,next) => {
  try {
    const context = {};

    context.tendn = req.query.tendn;
    context.matkhau = req.query.matkhau;
  
    console.log(context);
    const rows = await taikhoan.Login(context);
 
    if (req.query.tendn&&req.query.matkhau) {
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

exports.update = async (req, res,next) => {
    try {
      let taikhoans = getUpdateAccountFromRec(req);
  
      taikhoans.matk = parseInt(req.params.matk, 10);
  
      taikhoans = await taikhoan.updateById(taikhoans);
  
      if (taikhoans !== null) {
        res.status(200).json(taikhoans);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
};

exports.updateRole = async (req, res,next) => {
  try {
    let taikhoans = {};
    
    taikhoans.matk = req.body.matk;
    taikhoans.role_id=req.body.role_id;
    console.log(taikhoans)
    taikhoans = await taikhoan.updateRole(taikhoans);

    if (taikhoans !== null) {
      res.status(200).json(taikhoans);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
};


exports.delete = async(req, res,next) => {
    try {
      const id = parseInt(req.params.matk, 10);
  
      const success = await taikhoan.remove(id);
  
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