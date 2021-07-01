$(document).ready(function(){
 var dataCustomerBill=JSON.parse(sessionStorage.getItem("customerBill"));
 var dataProduct=JSON.parse(sessionStorage.getItem("product"));
 var dataAccount=JSON.parse(sessionStorage.getItem("userInfo"));
 var customerInfo=document.getElementsByClassName("customerInfo")[0];
 var productList=document.getElementsByClassName("product-list")[0];
 var checkoutBtn=document.getElementsByClassName("btn-login")[0];
 var tongtien=0;
 var today=new Date();
 var ngaylap=today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();

 customerInfo.innerHTML=`
 <p>Tên khách hàng: ${dataCustomerBill.hoten}</p>
 <p>Nơi giao:${dataCustomerBill.noigiao}</p>
 <p>Số điện thoại: ${dataCustomerBill.sdt}</p>
 `
 for(var i=0;i<dataProduct.length;i++){
     tongtien+=(Number(dataProduct[i].dongia)*Number(dataProduct[i].soluong));
    console.log(dataProduct[i]);
    $(".product-list").append(`
     <div>
     ${dataProduct[i].tensp}<span>${dataProduct[i].tenmau}, ${dataProduct[i].tenkt}</span><span> ${dataProduct[i].soluong}x${numberWithCommas(dataProduct[i].dongia)} vnđ</span>
     </div>
     `)
 }

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
        "sdt":dataCustomerBill.noigiao,
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