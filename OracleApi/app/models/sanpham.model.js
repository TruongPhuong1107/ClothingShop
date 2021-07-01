const sql = require("../config/config.js");
var fs =require("fs")
const oracledb = require("oracledb");
const sanpham = function(sanpham) {
    this.tensp = sanpham.tensp;
    this.dongia = sanpham.dongia;
    this.hinh=sanpham.hinh;
    this.hinh_rong=sanpham.hinh_rong;
    this.maloai=sanpham.maloai;
    this.mota=sanpham.mota;
    this.trangthai=sanpham.trangthai;
  };
sanpham.getAll= async() =>{
    const baseQuery =
   `     SELECT masp "masp",tensp "tensp", dongia "dongia", hinh "hinh", hinh_rong "hinh_rong", maloai "maloai", mota "mota", ngaylap "ngaylap",trangthai "trangthai",
   CURSOR (select t.makt "makt", k.tenkt "tenkt" from  kichthuoc k ,chitietkt t
       where k.makt=t.makt 
         and t.masp=d.masp) as "chitietkt",
   CURSOR(SELECT km.mamau "mamau" , m.tenmau "tenmau" from mau m, chitietmau km 
    where m.mamau=km.mamau
    and km.masp=d.masp
          ) as "chitietmau"
        from sanpham d`;
      const binds = {}; 
      const opts={};
      const result = await sql.simpleExecute(baseQuery, binds,opts);
      return result.rows;
    }
sanpham.getNew= async() =>{
    const baseQuery =
   `     SELECT masp "masp",tensp "tensp", dongia "dongia", hinh "hinh", hinh_rong "hinh_rong", maloai "maloai", mota "mota", ngaylap "ngaylap",trangthai "trangthai",
   CURSOR (select t.makt "makt", k.tenkt "tenkt" from  kichthuoc k ,chitietkt t
       where k.makt=t.makt 
         and t.masp=d.masp) as "chitietkt",
   CURSOR(SELECT km.mamau "mamau" , m.tenmau "tenmau" from mau m, chitietmau km 
    where m.mamau=km.mamau
    and km.masp=d.masp
          ) as "chitietmau"
        from sanpham d where d.trangthai=1`;
      const binds = {}; 
      const opts={};
      const result = await sql.simpleExecute(baseQuery, binds,opts);
      return result.rows;
    }

    sanpham.getById = async(context) => {
      const baseQuery =
      `SELECT masp "masp",tensp "tensp", dongia "dongia", hinh "hinh", hinh_rong "hinh_rong", maloai "maloai", mota "mota", ngaylap "ngaylap",
      CURSOR (select t.makt "makt", k.tenkt "tenkt" from  kichthuoc k ,chitietkt t
          where k.makt=t.makt 
            and t.masp=d.masp) as "chitietkt",
      CURSOR(SELECT km.mamau "mamau" , m.tenmau "tenmau" from mau m, chitietmau km 
       where m.mamau=km.mamau
       and km.masp=d.masp
             ) as "chitietmau"
           from sanpham d where masp = :masp`;
      const binds = {}; 
      if (context.id) {
        binds.masp = context.id;
      }
       const result = await sql.simpleExecute(baseQuery, binds); 
       return result.rows;
    }

    sanpham.getByIdAdmin = async(context) => {
      const baseQuery =
      `SELECT masp "masp",tensp "tensp", dongia "dongia", hinh "hinh", hinh_rong "hinh_rong", maloai "maloai", mota "mota", ngaylap "ngaylap",
      CURSOR (select t.makt "makt" from  kichthuoc k ,chitietkt t
          where k.makt=t.makt 
            and t.masp=d.masp) as "chitietkt",
      CURSOR(SELECT km.mamau "mamau" from mau m, chitietmau km 
       where m.mamau=km.mamau
       and km.masp=d.masp
             ) as "chitietmau"
           from sanpham d where masp = :masp`;
      const binds = {}; 
      if (context.id) {
        binds.masp = context.id;
      }
       const result = await sql.simpleExecute(baseQuery, binds); 
       return result.rows;
    }

    sanpham.getByIdCate = async(context) => {
      const baseQuery =
      `SELECT masp "masp",tensp "tensp", dongia "dongia", hinh "hinh", hinh_rong "hinh_rong", maloai "maloai", mota "mota", ngaylap "ngaylap",
      CURSOR (select t.makt "makt", k.tenkt "tenkt" from  kichthuoc k ,chitietkt t
          where k.makt=t.makt 
            and t.masp=d.masp) as "chitietkt",
      CURSOR(SELECT km.mamau "mamau" , m.tenmau "tenmau" from mau m, chitietmau km 
       where m.mamau=km.mamau
       and km.masp=d.masp
             ) as "chitietmau"
           from sanpham d where maloai = :maloai`;
      const binds = {}; 
      if (context.id) {
        binds.maloai = context.id;
      }
       const result = await sql.simpleExecute(baseQuery, binds); 
       return result.rows;
    }

    sanpham.getBySearch = async(context) => {
      const baseQuery =
      `SELECT masp "masp",tensp "tensp", dongia "dongia", hinh "hinh", hinh_rong "hinh_rong", maloai "maloai", mota "mota", ngaylap "ngaylap",
      
      CURSOR (select t.makt "makt", k.tenkt "tenkt" from  kichthuoc k ,chitietkt t
          where k.makt=t.makt 
            and t.masp=d.masp) as "chitietkt",
      CURSOR(SELECT km.mamau "mamau" , m.tenmau "tenmau" from mau m, chitietmau km 
       where m.mamau=km.mamau
       and km.masp=d.masp
             ) as "chitietmau"
           from sanpham d where d.tensp like :value || '%'`;
      const binds = {}; 
      if (context.value) {
        binds.value = context.value;
      }
       const result = await sql.simpleExecute(baseQuery, binds); 
       return result.rows;
    }

    sanpham.create = async (sp) => {
      const createSql =
     `insert into sanpham (
        tensp,
        dongia,
        hinh,
        hinh_rong,
        maloai,
        mota, 
        ngaylap,
        trangthai
      ) values (
        :tensp,
        :dongia,
        :hinh,
        :hinh_rong,
        :maloai,
        :mota,
        :ngaylap,
        :trangthai
      ) returning masp
      into :masp`;
      const createSql1 =`insert into chitietmau (masp, mamau) values (:masp, :mamau)`;
      const createSql2=`insert into chitietkt (masp, makt) values (:masp, :makt)`;
      const sanphams = Object.assign({}, sp);
     const sp1={
       tensp:sanphams.tensp,
       dongia:sanphams.dongia,
       hinh:sanphams.hinh,
       hinh_rong:sanphams.hinh_rong,
       maloai:sanphams.maloai,
       mota:sanphams.mota,
       ngaylap:sanphams.ngaylap,
       trangthai:sanphams.trangthai
     };
     sp1.masp = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    };
      const result = await sql.simpleExecute(createSql, sp1, { autoCommit: true} );
      sp1.masp= result.outBinds.masp[0];
      const ctmau=[];
      for (var i=0;i<sanphams.chitietmau.length;i++){
         ctmau[i]={
          masp:sp1.masp,
          mamau:sanphams.chitietmau[i].mamau
        }
        ctmau.push(ctmau[i]);
      }
      
      console.log(ctmau);
      const ctkt=[];
      for (var i=0;i<sanphams.chitietkt.length;i++){
         ctkt[i]={
          masp:sp1.masp,
          makt:sanphams.chitietkt[i].makt
        }
        ctkt.push(ctkt[i]);
      }
console.log(ctkt);
       for(var i=0;i<ctmau.length;i++){
      await sql.simpleExecute(createSql1, ctmau[i], { autoCommit: true} );
       }
       for(var i=0;i<ctkt.length;i++){
       await sql.simpleExecute(createSql2, ctkt[i], { autoCommit: true} );
       }
      return sanphams;
    };
    
    sanpham.updateById =async (sp) => {
     
      const updateSql =
     `update sanpham
      set tensp = :tensp,
        dongia = :dongia,
        hinh = :hinh,
        hinh_rong = :hinh_rong,
        maloai = :maloai,
        mota = :mota,
        ngaylap=:ngaylap
      where masp = :masp`;
      const updateSql1 =`update chitietmau set mamau=:mamau where masp=:masp and mamau=:mamau1 `;
      const updateSql2=`update chitietkt set makt=:makt where masp=:masp and makt=:makt1 `;
      
      const createSql1 =`insert into chitietmau (masp, mamau) values (:masp, :mamau)`;
      const createSql2=`insert into chitietkt (masp, makt) values (:masp, :makt)`;
     
      const selectSql1=`select mamau "mamau1" from chitietmau where masp=:masp`
      const selectSql2=`select makt "makt1"  from chitietkt where masp=:masp`
      const deleteSql1 =
      `begin
        delete from chitietmau where masp=:masp;
         :rowcount := sql%rowcount;
       end;`;
      const deleteSql2 =
      `begin
        delete from chitietkt where masp=:masp;

         :rowcount := sql%rowcount;
       end;`;
     
      const sanphams = Object.assign({}, sp);
      console.log(sanphams);
     const sp1={
       masp:sanphams.masp,
       tensp:sanphams.tensp,
       dongia:sanphams.dongia,
       hinh:sanphams.hinh,
       hinh_rong:sanphams.hinh_rong,
       maloai:sanphams.maloai,
       mota:sanphams.mota,
       ngaylap:sanphams.ngaylap
     };
     const binds={
      masp:sanphams.masp
    };
    const binddeletes = {
      masp: binds.masp,
      rowcount: {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
      }
    };
      const resultmau=await sql.simpleExecute(selectSql1,binds);
      const resultkt=await sql.simpleExecute(selectSql2,binds);     
      var resultmau_tmp=[]; var resultkt_tmp=[];
      resultmau_tmp=resultmau.rows;
      resultkt_tmp=resultkt.rows;
     
      const result = await sql.simpleExecute(updateSql, sp1, { autoCommit: true} );
      const ctmau=[];
      console.log(resultmau_tmp.length);
      console.log(sanphams.chitietmau.length);
      if(resultmau_tmp.length<sanphams.chitietmau.length|| resultmau_tmp.length>(sanphams.chitietmau.length-1)){
        for (var i=0;i<sanphams.chitietmau.length;i++){
          ctmau[i]={
           masp:sanphams.masp,
           mamau:sanphams.chitietmau[i].mamau,
  
         }
         ctmau.push(ctmau[i]);
       }
        await sql.simpleExecute(deleteSql1, binddeletes, { autoCommit: true} );
        for(var i=0;i<ctmau.length;i++){
          await sql.simpleExecute(createSql1, ctmau[i], { autoCommit: true} );
        }
      }else if(resultmau_tmp.length=sanphams.chitietmau.length){
        for (var i=0;i<sanphams.chitietmau.length;i++){
          ctmau[i]={
           masp:sanphams.masp,
           mamau:sanphams.chitietmau[i].mamau,
           mamau1:resultmau_tmp[i].mamau1
  
         }
         ctmau.push(ctmau[i]);
       }
        for(var i=0;i<ctmau.length;i++){
          await sql.simpleExecute(updateSql1, ctmau[i], { autoCommit: true} );
           }
      }
   
      
      console.log(ctmau);
      const ctkt=[];
      

if(resultkt_tmp.length<sanphams.chitietkt.length||resultkt_tmp.length>(sanphams.chitietkt.length-1)){
  for (var i=0;i<sanphams.chitietkt.length;i++){
    ctkt[i]={
     masp:sanphams.masp,
     makt:sanphams.chitietkt[i].makt,
   }
   ctkt.push(ctkt[i]);
 }
 console.log(ctkt);
  await sql.simpleExecute(deleteSql2, binddeletes, { autoCommit: true} );
  for(var i=0;i<ctkt.length;i++){
    await sql.simpleExecute(createSql2, ctkt[i], { autoCommit: true} );
  }
}else if(resultkt_tmp.length==sanphams.chitietkt.length){
  for (var i=0;i<resultkt_tmp.length;i++){
    ctkt[i]={
     masp:sanphams.masp,
     makt:sanphams.chitietkt[i].makt,
     makt1:resultkt_tmp[i].makt1
   }
   ctkt.push(ctkt[i]);
 }
  for(var i=0;i<ctkt.length;i++){
    await sql.simpleExecute(updateSql2, ctkt[i], { autoCommit: true} );
    }
}

       
       
     return sanphams;
    };
    sanpham.remove = async (id) => {
      const deleteSql =
     `begin
       delete from chitietmau where masp=:masp;
       delete from chitietkt where masp=:masp;
       delete from cthd where masp=:masp;
        delete from sanpham
        where masp = :masp;
        :rowcount := sql%rowcount;
      end;`;
      const binds = {
        masp: id,
        rowcount: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        }
      };
      console.log(binds);
      const result = await sql.simpleExecute(deleteSql, binds, { autoCommit: true} );
    
      return result.outBinds.rowcount === 1;
    
    };
    module.exports = sanpham;

