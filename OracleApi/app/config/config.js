const oracledb = require("oracledb");
const dbConfig = require("./db.config.js");

// Create a connection to the database
async function simpleExecute(statement, binds = [], opts = {}) {
    let connection;
  let result = [];
    try {
      connection = await oracledb.getConnection({
          user: dbConfig.user,
          password: dbConfig.password,
          connectString: dbConfig.connectString
      });
      opts.outFormat = oracledb.OBJECT;
        result = await connection.execute(statement, binds, opts);
        return (result);
    } catch (err) {
      console.error(err.message);
    } finally {
      if (connection) {
        try {
          // Always close connections
          await connection.close(); 
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }
module.exports.simpleExecute = simpleExecute;

