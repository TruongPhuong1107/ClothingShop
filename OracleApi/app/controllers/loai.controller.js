const loai = require("../models/loai.model.js");

// Create and Save a new Customer
function getLoaiFromRec(req) {
  const lo = {
   tenloai:req.body.tenloai
  };

  return lo;
}
exports.create = async(req, res,next) => {
  try {
    let loais = getLoaiFromRec(req);

    loais = await loai.create(loais);

    res.status(201).json(loais);
  } catch (err) {
    next(err);
  }
};

  async function findAll(req, res, next) {
    try {
      const rows = await loai.getAll();
  
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


exports.findOne = async (req, res,next) => {
  try {
    const context = {};

    context.id = parseInt(req.params.maloai, 10);
    const rows = await taikhoan.getById(context);
 
    if (req.params.maloai) {
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
      let loais = getLoaiFromRec(req);
  
      loais.maloai = parseInt(req.params.maloai, 10);
  
      loais = await loai.updateById(loais);
  
      if (loais !== null) {
        res.status(200).json(loais);
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
      const id = parseInt(req.params.maloai, 10);
  
      const success = await loai.remove(id);
  
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