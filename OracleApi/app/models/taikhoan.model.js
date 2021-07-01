const sql = require("../config/config.js");
const oracledb = require("oracledb");
// constructor
const taikhoan = function(taikhoan) {
  this.tenchutk = taikhoan.tenchutk;
  this.sdt = taikhoan.sdt;
  this.email=taikhoan.email;
  this.diachi=taikhoan.diachi;
  this.ngaysinh=taikhoan.ngaysinh;
  this.tendn=taikhoan.tendn;
  this.matkhau=taikhoan.matkhau;
  this.role_id=taikhoan.role_id;
};

taikhoan.create = async (tk) => {
  const createSql =
 `insert into taikhoan (
    tenchutk,
    sdt,
    email,
    diachi,
    ngaysinh,
    tendn,
    matkhau,
    role_id
  ) values (
    :tenchutk,
    :sdt,
    :email,
    :diachi,
    :ngaysinh,
    :tendn,
    :matkhau,
    :role_id
  ) returning matk
  into :matk`;

  const taikhoans = Object.assign({}, tk);

  taikhoans.matk = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  };

  const result = await sql.simpleExecute(createSql, taikhoans, { autoCommit: true} );

  taikhoans.matk = result.outBinds.matk[0];

  return taikhoans;
};

taikhoan.getById = async(context) => {
  const baseQuery =
  `select matk "matk",
     tenchutk "tenchutk",
      sdt "sdt",
     email "email",
     diachi "diachi",
     ngaysinh "ngaysinh",
     tendn "tendn",
     matkhau "matkhau",
     role_id "role_id"
   from taikhoan where matk = :matk`;
  const binds = {}; 
  if (context.id) {
    binds.matk = context.id;
  }
   const result = await sql.simpleExecute(baseQuery, binds); 
   return result.rows;
}
taikhoan.Login = async(context) => {
  const baseQuery =
  `select 
  matk "matk",
  tenchutk "tenchutk",
   sdt "sdt",
  email "email",
  diachi "diachi",
  ngaysinh "ngaysinh",
  tendn "tendn",
  matkhau "matkhau",
  role_id "role_id"
   from taikhoan where tendn = :tendn and matkhau=:matkhau`;
  const binds = {}; 
  if (context.tendn!=null&&context.matkhau!=null) {
    binds.tendn = context.tendn;
    binds.matkhau=context.matkhau;
  }
   const result = await sql.simpleExecute(baseQuery, binds); 
   return result.rows;
}

 taikhoan.getAll= async() =>{
  const baseQuery =
 `select matk "matk",
    tenchutk "tenchutk",
     sdt "sdt",
    email "email",
    diachi "diachi",
    ngaysinh "ngaysinh",
    tendn "tendn",
    matkhau "matkhau",
    role_id "role_id"
  from taikhoan`;

    let query = baseQuery;
    const binds = []; 
    const opts={};
    const result = await sql.simpleExecute(query, binds,opts);
  
    return result.rows;
  }

  // module.exports.getAll = getAll;

taikhoan.updateById =async (tk) => {
  const updateSql =
 `update taikhoan
  set tenchutk = :tenchutk,
    sdt = :sdt,
    email = :email,
    diachi = :diachi,
    ngaysinh = :ngaysinh
  where matk = :matk`;

  const taikhoans = Object.assign({}, tk);
  const result = await sql.simpleExecute(updateSql, taikhoans, { autoCommit: true} );

  if (result.rowsAffected && result.rowsAffected === 1) {
    return taikhoans;
  } else {
    return null;
  }
};
taikhoan.updateRole =async (tk) => {
  const updateSql1 =
  `update taikhoan
   set role_id = :role_id
   where matk = :matk`;
 

  const taikhoans = Object.assign({}, tk);
   console.log(taikhoans);
  const result = await sql.simpleExecute(updateSql1, taikhoans, { autoCommit: true} );

  if (result.rowsAffected && result.rowsAffected === 1) {
    return taikhoans;
  } else {
    return null;
  }
};

taikhoan.remove = async (id) => {
  const deleteSql =
 `begin
    delete from taikhoan
    where matk = :matk;
    :rowcount := sql%rowcount;
  end;`;
  const binds = {
    matk: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };
  const result = await sql.simpleExecute(deleteSql, binds, { autoCommit: true} );

  return result.outBinds.rowcount === 1;

};
module.exports = taikhoan;