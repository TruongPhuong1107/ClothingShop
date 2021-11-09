
var Customer=JSON.parse(sessionStorage.getItem("userInfo"));
var data={"makh":Customer.matk};
var innerDiv;
$(document).ready(function(){
    console.log(data);
    $.ajax({
        type:"GET",
        data:data,
        headers: {
            "Content-Type": "application/json",
          },
        url:`http://localhost:3002/khachhang/hoadon`,
        success:function(datas){
            console.log(datas);
           
            datas.forEach((item,index) => {
                $(".bill").append(`
                <div class="billInfoItem">
                <div class="info">
                <h3>Số hóa đơn: ${index+1}</h3>
                <p>Họ tên người đặt: ${item.hoten}</p>
                <p>Nơi giao hàng: ${item.noigiao}</p>
                <p>Trạng thái: ${!item.trangthai ?"<span>Chưa giao hàng</span>" :"<span>Giao thành công</span>"}</p>
                   <p>Ngày lập: ${item.ngaylap}</p>
                </div >
                <div class="billInfo">
                ${item.cthd.map(billinfo =>`<div class="billinfo-item">
                <div class="ibillinfo image"><img src="../img/${billinfo.hinh}" width="100" height="100"></div>
                <div class="forResponsive">
                <div class="ibillinfo color">${billinfo.tensp}</div>
                <div class="ibillinfo ">${billinfo.tenmau}</div>
                <div class="ibillinfo">${billinfo.tenkt}</div>
                <div class="ibillinfo">${billinfo.soluong}</div>
                <div class="ibillinfo price">${numberWithCommas(billinfo.dongia) } vnđ</div>   
                </div>
                </div>`).join('')}
                </div>
                <div class="total"><b>Tổng tiền</b>: <span class="number">${numberWithCommas(item.tongtien)}</span> vnđ</div>
                </div>
                `)});  
        }
    })
})
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }