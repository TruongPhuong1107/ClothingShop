var queryDict = {}
location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
var idcategory;
var data=[];
$(document).ready( function () {
    let idSupplier ;
    let idCategory ;
    
    $( function () {
       $.ajax({
        async: false,
        type: "GET",
        url: `http://localhost:3002/sanpham/${queryDict.id}`,
        success: function (datas) {
            
             data=datas;
            sessionStorage.setItem("mau", JSON.stringify(data.chitietmau));
            sessionStorage.setItem("kichthuoc",JSON.stringify(data.chitietkt));
              $("#placeAdd").append(
                `
                <div class="contentCont">
                <div class="infoUser Left">
                    <div class="subInfo">
                        <div class="info">ID</div>
                        <input type="text" id="id" class="inputField" value="${data.masp}">
                    </div>
                    <div class="subInfo">
                        <div class="info">Tên Sản Phẩm</div>
                        <input type="text" id="name" class="inputField" value="${data.tensp}">
                    </div>
            
                    <div class="subInfo">
                        <div class="info"> Giá Tiền</div>
                        <input type="text" id="price" class="inputField" value=${data.dongia}>
                    </div>
                    <div class="subInfo1">
                        <div class="info">Hình Ảnh</div>
                        <img src="../img/${data.hinh}" width="100" height="100" id="img">
                        <input type="file"  value="${data.hinh}" id="picFile" onchange="changeHandler(event)">
                    </div>
                    <div class="subInfo1">
                        <div class="info">Hình Ảnh Zoom</div>
                        <img src="../img/${data.hinh_rong}" width="100" height="100" id="img_zoom">
                        <input type="file"  value="${data.hinh_rong}" id="imgzoomfile"  onchange="changeHandler(event,img_zoom)">
                    </div>
                 </div>
                <div class="infoUser Right">
                <div class="form-group">
                <label for="formGroupExampleInput">Loại</label>
                <select class="form-control" id="categoryCode">
                </select>
                     </div>
                     <div class="form-group">
                       <label for="formGroupExampleInput">Màu</label>
                       <select class="form-control" id="colorCode">              
                       </select>
                       <input type="button" class="select select-color" value="Chọn">
                     </div>
                     <div class="form-group empty color-group">
              
                     </div>
                     <div class="form-group">
          <label for="formGroupExampleInput">Kích thước</label>
          <select class="form-control" id="sizeCode">
           
          
          </select>
          <input type="button" class="select select-size" value="Chọn">
        </div>
        <div class="form-group empty size-group">
              
        </div>
                    <div class="subInfo">
                        <div class="info">Mô Tả </div>
                        <textarea  id="detail"  class="inputField" value="" > ${data.mota}</textarea>
                    </div>
                  
                    <div class="btnAccept" onclick="adjustProduct()" >Xác Nhận</div>
                </div>
            </div>
    `
              )
              data.chitietmau.forEach((item)=>{

                $(".color-group").append(`<div class="color-group1"><span id="colorUnitText">${item.tenmau}</span><input type="text" id="delete" value="x" onclick="deleteColor(event)"></div>`)
                  
               })
               data.chitietkt.forEach((item)=>{
        
                $(".size-group").append(`<div class="color-group1"><span id="sizeUnitText">${item.tenkt}</span><input type="text" id="delete" value="x" onclick="deleteSize(event)"></div>`)
                  
               })
        },
      }).then( ()=>{
        
        callApi("GET","loai").forEach(loai => {
            $("#categoryCode").append(
              `<option value =${loai.maloai}>${loai.tenloai}</option>`
            )
          })
          callApi("GET","mau").forEach(mau => {
            $("#colorCode").append(
              `<option value =${mau.mamau}>${mau.tenmau}</option>`
            )   
          })
          callApi("GET","kichthuoc").forEach(kichthuoc => {
            $("#sizeCode").append(
              `<option value =${kichthuoc.makt}>${kichthuoc.tenkt}</option>`
            )   
          })
     
         
      });
    });
    
 
});
console.log(data);
 var sp= callApi1("GET","sanpham/"+queryDict.id);
var size=sp.chitietkt;
console.log(size);
  $(document).on("click", ".select-size",  function(){
    
    var sizeUnitCode=$("#sizeCode").val();
    var sizeUnitText=document.getElementById("sizeCode").selectedOptions[0].text;
    
    var sizeUnit={
      "makt":sizeUnitCode,
      "tenkt":sizeUnitText
    };
    console.log(size);
    for(var i=0;i<size.length;i++){
     
      if(size[i].makt==sizeUnit.makt){
        console.log(size[i])
        alert("Kích thước này đã được chọn")
        return;
      }
    }
    size.push(sizeUnit);
      $(".size-group").append (`<div class="color-group1"><span id="colorUnitText">${sizeUnitText}</span><input type="text" id="delete" value="x" onclick="deleteSize(event)"></div>`);
     
  })
const deleteSize=(event)=>{
  var x=event.target
if(x.value="x"){
  x.parentElement.style.display="none";
  var y= x.parentElement.firstElementChild.innerHTML;
  console.log(y);
  for(var i=0;i<size.length;i++){
  if(size[i].tenkt==y){
    size.splice(i,1)
  }
}
console.log(size);
}
}


var color=sp.chitietmau;
$(document).on("click", ".select-color", function(){
   
  var colorUnitCode=$("#colorCode").val();
  var colorUnitText=document.getElementById("colorCode").selectedOptions[0].text;
  var colorUnit={
    "mamau":colorUnitCode,
    "tenmau":colorUnitText
  };
 
  for(var i=0;i<color.length;i++){
    if(color[i].mamau==colorUnit.mamau){
      alert("Màu này đã được chọn")
      return;
    }
  }
  color.push(colorUnit);
console.log(color);
    $(".color-group").append (`<div class="color-group1"><span id="colorUnitText">${colorUnitText}</span><input type="text" id="delete" value="x" onclick="deleteColor(event)"></div>`);
  
})
const deleteColor=(event)=>{
var x=event.target
if(x.value="x"){
x.parentElement.style.display="none";
var y= x.parentElement.firstElementChild.innerHTML;
for(var i=0;i<color.length;i++){
if(color[i].tenmau==y){
  color.splice(i,1)
}
}

}
}

function changeHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  // FileList object.
  var files = evt.target.files;

  var file = files[0];

  var fileReader = new FileReader();


  fileReader.onload = function(progressEvent) {
      var url = fileReader.result;

      // Something like: data:image/png;base64,iVBORw...Ym57Ad6m6uHj96js
      console.log(url);
      //
      var myImg = evt.target.parentElement.children[1];
      console.log(myImg);
      myImg.src= url;
  }


  // Read file asynchronously.
  fileReader.readAsDataURL(file); // fileReader.result -> URL.
}

////////////////////// post SP

var pic_org=sp.hinh;
var piczoom_org=sp.hinh_rong;

function adjustProduct()
{
    let detail =document.getElementById("detail").value;
    let name = document.getElementById("name").value;
    let pic =document.getElementById("picFile").files[0];
    let price = document.getElementById("price").value;
    let piczoom = document.getElementById("imgzoomfile").files[0];
    let cate = document.getElementById("categoryCode").value;
  
    if(typeof pic === 'undefined'){
      pic=pic_org;
    }
    else{
      
      pic=pic.name;
    }
    if(typeof piczoom === 'undefined'){
      piczoom=piczoom_org;
    }
    else{
  
      piczoom=piczoom.name;
    }

    
 
    let obj={
      
        "mota": detail,
        "dongia": price,
        "tensp": name,
        "hinh": pic,
        "hinh_rong": piczoom,
        "maloai":cate,
        "chitietkt":size,
        "chitietmau":color    
      }
     
    console.log(JSON.stringify(obj));
    let formData = new FormData(); 
    let fileUpLoad=[];
    fileUpLoad.push(pic);
    fileUpLoad.push(piczoom);
  fileUpLoad.forEach(async (item)=>{
    formData.append("file", item);
  await fetch('../upload.php', {
    method: 'POST', 
    body: formData
  }); 
  });
    $.ajax({
        type:"PUT",
        headers: { 
          
            'Content-Type': 'application/json' 
        },
        url: `http://localhost:3002/sanpham/${queryDict.id}`,
        data:JSON.stringify(obj),
        success:function(data)
        {
            alert("Success");
            console.log(data);
            window.location="Product.html"; 
        },

    })
    
}


function callApi(method, endpoint = "", data = null) {
    var datar;
    $.ajax({
      async: false,
      type: method,
      data: data,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:3002/" + endpoint,
      success: function (data) {
        datar = data;
      },
    });
    return datar;
  }
function callApi1(method, endpoint = "") {
    var datar;
    $.ajax({
      async: false,
      type: method,
      url: "http://localhost:3002/" + endpoint,
      success: function (data) {
        datar = data;
      },
    });
    return datar;
  }
