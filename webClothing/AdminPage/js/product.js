
   var dat=[];
$(document).ready(function () {
 var data={
   "page":1,
   "limit":100
 }
  $(function () {
 
    $.ajax({
      type: "GET",
      data:data,
      url: "http://localhost:3002/sanpham",
      success: function (datas) {
        dat=datas;
        console.log(dat);
        datas.forEach((data,index) => {
                    $("#placeAdd").append(
            ` <div class="productCont">
            <div class="productInfo pdSTT" >
                ${index + 1}
            </div>
            <div class="productInfo pdImgCont" >
                <img src="../img/${data.hinh}" alt="" class="pdImg">
            </div>
            <div class="productInfo pdIdName">${data.masp}</div>
            <div class="productInfo pdName">${data.tensp}</div>
            <div class="productInfo pdPrice">${numberWithCommas(data.dongia)} vnđ</div>
            <div class="productInfo pdColor " >${data.mota}  </div>
           
            <div class="productInfo pdAction">
                <a href="./EditProduct.html?id=${
                  data.masp
                }"><div class="bt edit">Sửa</div></a>
                <div class="bt remove" getID=${
                  data.masp
                } onclick="removeProduct(this)">Xóa</div>
            </div>
        </div>`
          )

          
        });
      },
    });
  });
  
});




  
    

function removeProduct(event) {
  event=window.event;
  if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      $.ajax({
        type:"DELETE",
        headers: { 
          
            'Content-Type': 'application/json' 
        },
        url: `http://localhost:3002/sanpham/${event.target.getAttribute("getID")}`,
        success:function(data)
        {
            alert("Success");
            console.log(data);
            window.location="Product.html";  
        },
    })
  } else {
    return;
  }
}

function callApi(method, endpoint = "", data = null) {
  var datar;
  $.ajax({
    async: false,
    type: method,
    data: data,
    headers: { "Content-Type": "application/json" },
    url: "http://localhost:8080/" + endpoint,
    success: function (data) {
      datar = data;
    },
  });
  return datar;
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}