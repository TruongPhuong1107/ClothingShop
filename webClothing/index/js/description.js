////xử lí tab-panel///
var listul= document.getElementsByTagName("ul")[0];
var listli= listul.getElementsByTagName("li");
var tab=document.getElementsByClassName("tab-panel");
var i;
function chontab(n){
    for(i=0;i<tab.length;i++){
        tab[i].style.display="none";
       }
      for(i=0;i<tab.length;i++){
        tab[i].className=tab[i].className.replace("active1","")
       }
      for(i=0;i<listli.length;i++){
        listli[i].className=listli[i].className.replace("active2","")
       }
   tab[n].style.display="block";
   tab[n].className+=" active1";
   listli[n].className+="active2";
}
console.log(listli.length);



 ///////xử lý load dữ liệu/////
 var queryDic={};
 var dongia;
location.search.substr(1).split("&").forEach(function(item) {queryDic[item.split("=")[0]]=item.split("=")[1]})
console.log(queryDic);
$(document).ready( function () {
   $.ajax({
     async:false,
       type:"GET",
       url:`http://localhost:3002/sanpham/${queryDic.id}`,
       headers: { 
        'Content-Type': 'application/json' 
      },
      success: function (data) {
        dongia=data.dongia;
        console.log(data);
          $(".product-name-price").append(`
          <h2 id="product-name-h2">${data.tensp}</h2>
          <span id="product-price">${numberWithCommas(data.dongia)} vnđ</span>
          `)

         $(".left-column").append(
       `<div class="proImgDescription">
       <img class="myimage" id="myimage" data-zoom-image="../img/${data.hinh_rong}" src="../img/${data.hinh}" width="380px" height="400px" alt="">
       </div>
       <div class="myresult" class="img-zoom-result" ></div>
       `
       )
      
        
       data.chitietmau.forEach((items)=>{
        $("#color-select").append(`
         <option value="${items.mamau}">${items.tenmau}</option>`)
    })
       

        data.chitietkt.forEach((items)=>{
           $("#custom-select").append(`
            <option value="${items.makt}">${items.tenkt}</option>`)
       })
       $(".tab-panel-detail").append(`<div>${data.mota}</div>`)
    }
   }
   )
    
})

window.addEventListener('DOMContentLoaded', (event) => {
  console.log(queryDic.id);
  var btnmua=document.getElementById("input-themvaogio");
function themvaogio(){
  var name=document.getElementById("product-name-h2").innerText;
  var img=document.getElementById("myimage").getAttribute("src");
  var color=document.getElementById("color-select").value;
  var color_text=document.getElementById("color-select").selectedOptions[0].text;
  var size_text=document.getElementById("custom-select").selectedOptions[0].text;
  var size=document.getElementById("custom-select").value;
  var qtt=document.getElementById("quantity").value;
  if(sessionStorage.getItem("userInfo")){
    var product=[];
    var item={
    "masp":queryDic.id,
    "tensp":name,
     "hinh":img,
     "mamau":color,
     "tenmau":color_text,
     "makt":size,
     "tenkt":size_text,
     "dongia":dongia,
     "soluong":qtt
    }
    console.log(item);
  if(sessionStorage.getItem("product")==null){
    sessionStorage.setItem("product", JSON.stringify(product));
  }
   let temp=JSON.parse(sessionStorage.getItem("product"));
    for(var i=0;i<temp.length;i++){
      if(temp[i].masp===queryDic.id&&temp[i].mamau===item.mamau&&temp[i].makt===item.makt){
        temp[i].soluong=Number(temp[i].soluong)+Number(item.soluong);
        sessionStorage.setItem("product",JSON.stringify(temp));
       return;
      }
    }
    temp.push(item);
    alert("Thêm vào giỏ thành công");
    sessionStorage.setItem("product", JSON.stringify(temp));
   }
   else{
     window.location="./login.html"
   }
 }
 
btnmua.addEventListener('click',themvaogio);
function zoom(){
  $("#myimage").ezPlus();
}
zoom();
});
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}