$(document).ready(function(){
 var dataCustomerBill=JSON.parse(sessionStorage.getItem("customerBill"));
 var dataProduct=JSON.parse(sessionStorage.getItem("product"));
 var dataAccount=JSON.parse(sessionStorage.getItem("userInfo"));
 var customerInfo=document.getElementsByClassName("customerInfo")[0];
 var checkoutBtn=document.getElementsByClassName("btn-lastCheckout")[0];
 var tongtien=0;
 var today=new Date();
 var ngaylap=today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
 for(var i=0;i<dataProduct.length;i++){
     tongtien+=(Number(dataProduct[i].dongia)*Number(dataProduct[i].soluong));
    $(".product-list").append(`
     <div>
     <div>${dataProduct[i].tensp}</div>
     <div>${dataProduct[i].tenmau}, ${dataProduct[i].tenkt}</div>
     <div> ${dataProduct[i].soluong}x${numberWithCommas(dataProduct[i].dongia)} vnđ</div>
     </div>
     `)
 }
 customerInfo.innerHTML=`
 <table>
    <tr>
        <th>Tên khách hàng</th>
        <td> ${dataCustomerBill.hoten}</td>
    </tr>
    <tr>
        <th>Nơi giao</th>
        <td> ${dataCustomerBill.noigiao}</td>
    </tr>
    <tr>
        <th>Số điện thoại</th>
        <td> ${dataCustomerBill.sdt}</td>
    </tr>
    <tr>
        <th>tổng thanh toán</th>
        <td> ${numberWithCommas(tongtien)} vnđ</td>
    </tr>
    </table>`
 function Checkout(){
    var cthd=[];   
    for(var i=0;i<dataProduct.length;i++){
        var product={};
        product.masp=dataProduct[i].masp;
        product.mamau=dataProduct[i].mamau;
        product.makt=dataProduct[i].makt;
        product.soluong=dataProduct[i].soluong;
        product.dongia=dataProduct[i].dongia;
        cthd.push(product);
    }
    var bill={
        "makh":dataAccount.matk,
        "ngaylap":ngaylap,
        "tongtien":tongtien,
        "noigiao":dataCustomerBill.noigiao,
        "hoten":dataCustomerBill.hoten,
        "sdt":dataCustomerBill.sdt,
        "trangthai":0,
        "cthd":cthd
    }
    console.log(bill);
    $.ajax({
        type:"POST",
        url:`http://localhost:3002/hoadon/`,
        headers: { 
            'Content-Type': 'application/json' 
        },
        data:JSON.stringify(bill),
        success: function(){
        sessionStorage.removeItem("product");
        sessionStorage.removeItem("customerBill");
        alert("Mua hàng thành công");
         window.location="./index.html";
        }
    })
}
checkoutBtn.addEventListener("click",Checkout)
})
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}