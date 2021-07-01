const sql = require("../config/config.js");
const oracledb = require("oracledb");
// constructor
const loai = function(loai) {
  this.maloai = loai.maloai;
  
};

loai.create = async (lo) => {
  const createSql =
 `insert into loai (
    tenloai
  ) values (
    :tenloai
  ) returning maloai
  into :maloai`;

  const loais = Object.assign({}, lo);

  loais.maloai = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  };

  const result = await sql.simpleExecute(createSql, loais, { autoCommit: true} );

  loais.maloai= result.outBinds.maloai[0];

  return loais;
};

loai.getById = async(context) => {
  const baseQuery =
  `select maloai "maloai",
     tenloai "tenloai"
   from loai where maloai = :maloai`;
  const binds = {}; 
  if (context.id) {
    binds.maloai = context.id;
  }
   const result = await sql.simpleExecute(baseQuery, binds); 
   return result.rows;
}

 loai.getAll= async() =>{
  const baseQuery =
 `select maloai "maloai",
 tenloai "tenloai"
  from loai`;

    let query = baseQuery;
    const binds = []; 
    const opts={};
    const result = await sql.simpleExecute(query, binds,opts);
  
    return result.rows;
  }

  // module.exports.getAll = getAll;

loai.updateById =async (lo) => {
  const updateSql =
 `update loai
  set tenloai = :tenloai
  where maloai = :maloai`;

  const loais = Object.assign({}, lo);
  const result = await sql.simpleExecute(updateSql, loais, { autoCommit: true} );

  if (result.rowsAffected && result.rowsAffected === 1) {
    return loais;
  } else {
    return null;
  }
};

loai.remove = async (id) => {
  const deleteSql =
 `begin
    delete from loai
    where maloai = :maloai;
    :rowcount := sql%rowcount;
  end;`;
  const binds = {
    maloai: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };
  const result = await sql.simpleExecute(deleteSql, binds, { autoCommit: true} );

  return result.outBinds.rowcount === 1;

};
module.exports = loai;