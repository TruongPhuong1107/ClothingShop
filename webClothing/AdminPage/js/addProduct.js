var btnAccept = document.getElementsByClassName('btnAccept')[0];
btnAccept.addEventListener('click',addProduct)
sp =1;
$(document).ready(function () {
  document.getElementById('newsp').onclick = function (e) {
    if (this.checked) {
      sp = 1;
      document.getElementById("oldsp").checked = 0;
    }
  };
  document.getElementById('oldsp').onclick = async function (e) {
    if (this.checked) {
      sp=0;
      document.getElementById("newsp").checked = 0;
    }
  };

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
})



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
  var colorId=[];
  $(document).on("click", ".select-color", function(){
     
    var colorUnitCode=$("#colorCode").val();
    var colorUnitText=document.getElementById("colorCode").selectedOptions[0].text;
    var colorIdUnit={
      "mamau":colorUnitCode
    };
    for(var i=0;i<colorId.length;i++){
      if(colorId[i].mamau===colorIdUnit.mamau){
        alert("Màu này đã được chọn")
        return;
      }
    }
    colorId.push(colorIdUnit)
      $(".color-group").append (`<div class="color-group1"><span id="colorUnitText" datar="${colorUnitCode}">${colorUnitText}</span><input type="text" id="delete" value="x" onclick="deleteColor(event)"></div>`);
    console.log(colorId);
  })
const deleteColor=(event)=>{
  var x=event.target
if(x.value="x"){
  x.parentElement.style.display="none";
  var y= x.parentElement.firstElementChild.getAttribute("datar");
  for(var i=0;i<colorId.length;i++){
  if(colorId[i].mamau===y){
    colorId.splice(i,1)
  }
}
}
}

var sizeId=[];
  $(document).on("click", ".select-size", function(){
     
    var sizeUnitCode=$("#sizeCode").val();
    var sizeUnitText=document.getElementById("sizeCode").selectedOptions[0].text;
    var sizeIdUnit={
      "makt":sizeUnitCode
    };
    for(var i=0;i<sizeId.length;i++){
      if(sizeId[i].makt===sizeIdUnit.makt){
        alert("Kích thước này đã được chọn")
        return;
      }
    }
    sizeId.push(sizeIdUnit);
      $(".size-group").append (`<div class="color-group1"><span id="colorUnitText" data="${sizeUnitCode}">${sizeUnitText}</span><input type="text" id="delete" value="x" onclick="deleteSize(event)"></div>`);
    console.log(sizeId);
  })
const deleteSize=(event)=>{
  var x=event.target
if(x.value="x"){
  x.parentElement.style.display="none";
  var y= x.parentElement.firstElementChild.getAttribute("data");
  console.log(y);
  for(var i=0;i<sizeId.length;i++){
  if(sizeId[i].makt===y){
    sizeId.splice(i,1)
  }
}
}
}


function addProduct()
{
   
    let detail =document.querySelector("#detail").value;
    let idcategory= $("#categoryCode").val();
    let name = document.querySelector("#name").value;
    let pic =document.getElementById("pic").files[0];
    let piczoom =document.getElementById("piczoom").files[0];
    let price = document.getElementById("price").value;
    console.log(idcategory);
    let obj={
        "mota": detail,
        "maloai": idcategory,
        "tensp": name,
        "hinh": pic.name,
        "hinh_rong": piczoom.name,
        "dongia": price*1,
        "trangthai":sp,
        "chitietmau":colorId,
        "chitietkt":sizeId
    }
    console.log(obj);
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
        type:"POST",
        headers: { 
          
            'Content-Type': 'application/json' 
        },
        url: "http://localhost:3002/sanpham",
        data:JSON.stringify(obj),
        success:function(data)
        {
            alert("Success");
            console.log(data);
            window.location="Product.html"; 
        },

    })
    
}

