const sql = require("../config/config.js");
const oracledb = require("oracledb");

getAllColor= async() =>{
    const baseQuery =
   `select mamau "mamau",
   tenmau "tenmau"
    from mau`;
  
      let query = baseQuery;
      const binds = []; 
      const opts={};
      const result = await sql.simpleExecute(query, binds,opts);
    
      return result.rows;
    }
module.exports.getAllColor=getAllColor;

getAllSize= async() =>{
    const baseQuery =
   `select makt "makt",
   tenkt "tenkt"
    from kichthuoc`;
  
      let query = baseQuery;
      const binds = []; 
      const opts={};
      const result = await sql.simpleExecute(query, binds,opts);
    
      return result.rows;
    }
module.exports.getAllSize=getAllSize;