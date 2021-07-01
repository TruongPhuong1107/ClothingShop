const sql = require("../config/config.js");
const oracledb = require("oracledb");
const hoadon = function(hoadon) {
    this.makh = hoadon.makh;
    this.tongtien = hoadon.tongtien;
    this.ngaylap=hoadon.ngaylap;
    this.noigiao=hoadon.noigiao;
    this.sdt=hoadon.sdt;
    this.hoten=hoadon.hoten;
    this.trangthai=hoadon.trangthai;
  };
hoadon.getAll= async() =>{
    const baseQuery =
   `SELECT mahd "mahd",makh "makh", ngaylap "ngaylap", tongtien "tongtien", noigiao "noigiao", hoten "hoten", sdt "sdt", trangthai "trangthai",
   CURSOR(SELECT t.masp "masp", s.tensp "tensp", t.soluong "soluong",s.dongia"dongia", k.tenkt "tenkt", m.tenmau "tenmau" from mau m, kichthuoc k, sanpham s, cthd t 
    where m.mamau=t.mamau
    and t.makt=k.makt
    and s.masp=t.masp
    and t.mahd=d.mahd
          ) as "cthd"
        from hoadon d`;
      const binds = {}; 
      const opts={};
      const result = await sql.simpleExecute(baseQuery, binds,opts);
      return result.rows;
    }

    hoadon.getById = async(context) => {
      const baseQuery =
      `SELECT mahd "mahd",makh "makh", ngaylap "ngaylap", tongtien "tongtien", noigiao "noigiao", hoten "hoten", sdt "sdt", trangthai "trangthai",
      CURSOR(SELECT t.masp "masp", s.tensp "tensp", t.soluong "soluong",s.dongia"dongia", k.tenkt "tenkt", m.tenmau "tenmau" from mau m, kichthuoc k, sanpham s, cthd t 
       where m.mamau=t.mamau
       and t.makt=k.makt
       and s.masp=t.masp
       and t.mahd=d.mahd
             ) as "cthd"
           from hoadon d where mahd=:mahd`;
      const binds = {}; 
      if (context.id) {
        binds.mahd = context.id;
      }
       const result = await sql.simpleExecute(baseQuery, binds); 
       return result.rows;
    }

    hoadon.create = async (hd) => {
      const createSql =
     `insert into hoadon (
        makh,
        ngaylap,
        tongtien,
        hoten,
        noigiao,
        sdt, trangthai
      ) values (
        :makh,
        :ngaylap,
        :tongtien,
        :hoten,
        :noigiao,
        :sdt,
        :trangthai
      ) returning mahd
      into :mahd`;
      const createSql1 =`insert into cthd (mahd, masp, mamau, makt, soluong, dongia) values (:mahd, :masp,:mamau,:makt, :soluong,:dongia)`;
     const hoadons = Object.assign({}, hd);
     const hd1={
       makh:hoadons.makh,
       ngaylap:hoadons.ngaylap,
       tongtien:hoadons.tongtien,
       hoten:hoadons.hoten,
       noigiao:hoadons.noigiao,
       sdt:hoadons.sdt,
       trangthai:hoadons.trangthai
     };
     hd1.mahd = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    };
      const result = await sql.simpleExecute(createSql, hd1, { autoCommit: true} );
      hd1.mahd= result.outBinds.mahd[0];
      const cthd=[];
      for (var i=0;i<hoadons.cthd.length;i++){
         cthd[i]={
          mahd:hd1.mahd,
          masp:hoadons.cthd[i].masp,
          mamau:hoadons.cthd[i].mamau,
          makt:hoadons.cthd[i].makt,
          soluong:hoadons.cthd[i].soluong,
          dongia:hoadons.cthd[i].dongia
        }
        cthd.push(cthd[i]);
      }
      
      console.log(cthd);

       for(var i=0;i<cthd.length;i++){
      await sql.simpleExecute(createSql1, cthd[i], { autoCommit: true} );
       }
      return hoadons;
    };

    hoadon.updateState =async (lo) => {
      const updateSql =
     `update hoadon
      set trangthai = :trangthai
      where mahd = :mahd`;
    
      const hoadons = Object.assign({}, lo);
      const result = await sql.simpleExecute(updateSql, hoadons, { autoCommit: true} );
    
      if (result.rowsAffected && result.rowsAffected === 1) {
        return hoadons;
      } else {
        return null;
      }
    };
    

    hoadon.remove = async (id) => {
      const deleteSql =
     `begin
       delete from cthd where mahd=:mahd;
        delete from hoadon
        where mahd = :mahd;
        :rowcount := sql%rowcount;
      end;`;
      const binds = {
        mahd: id,
        rowcount: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        }
      };
      const result = await sql.simpleExecute(deleteSql, binds, { autoCommit: true} );
    
      return result.outBinds.rowcount === 1;
    
    };
    module.exports = hoadon;

