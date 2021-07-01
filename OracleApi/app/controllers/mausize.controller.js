const mausize= require("../models/mausize.model.js");

  async function findAllColor(req, res, next) {
    try {
      const rows = await mausize.getAllColor();
  
        res.status(200).json(rows);
      
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.findAllColor = findAllColor;

  async function findAllSize(req, res, next) {
    try {
      const rows = await mausize.getAllSize();
  
     
        res.status(200).json(rows);
      
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.findAllSize = findAllSize;

