var btn=document.getElementsByClassName("btn-login")[0];
function getBillInfo(){
var name =document.getElementsByClassName("name")[0].value;
var address=document.getElementsByClassName("address")[0].value;
var phoneNumber=document.getElementsByClassName("phone-number")[0].value;
var customerBill={
    "hoten":name,
    "noigiao":address,
    "sdt":phoneNumber
}
console.log(customerBill);
if(sessionStorage.getItem("customerBill")!==null){
    sessionStorage.removeItem("customerBill")
}
sessionStorage.setItem("customerBill", JSON.stringify(customerBill));
}
btn.addEventListener("click",getBillInfo);

