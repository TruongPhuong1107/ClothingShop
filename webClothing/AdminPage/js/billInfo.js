var queryDic={};
location.search.substr(1).split("&").forEach(function(item) {queryDic[item.split("=")[0]]=item.split("=")[1]} )
console.log(queryDic);
function callApi(method, endpoint = "", data = null) {
    var datar;
    $.ajax({
      async: false,
      type: method,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:3002/" + endpoint,
      data: data,
    
      success: function (data) {
        datar = data;
      },
    });
    return datar;
  }
$(document).ready(async function(){
  var tong=0;
   var x= callApi("GET", "hoadons", {
        mahd: queryDic.mahd,
      });
      console.log(x.cthd);
     await  x.cthd.forEach((billinfo) => {
        tong+=(Number(billinfo.dongia)*Number(billinfo.soluong));
        $("#tbodybillinfo").append(
          `
                  <tr>
                      <td style="width: 8%">
                          ${queryDic.mahd}
                      </td>
                      <td style="width: 12%">
                          ${billinfo.tensp}
                      </td>
                      <td style="width: 12%">
                          ${billinfo.tenmau}
                      </td>
                      <td style="width: 12%">
                          ${billinfo.tenkt}
                      </td>
                      <td style="width: 10%">
                          ${numberWithCommas(billinfo.dongia)}vnđ
                      </td>
                      <td style="width:9%" >
                          ${billinfo.soluong}
                      </td>
                  </tr>
                  `
        );
      });
      $(".total").append(`<div id="billInfoTotal"><b>Tổng tiền:</b> ${numberWithCommas(tong)} vnđ</div>`);
})

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}