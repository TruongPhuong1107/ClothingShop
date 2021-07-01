var obj={"page":1, "limit":6}
$(document).ready(function () {
    
    $.ajax({
        type:"GET",
        async:false,
        url:"http://localhost:3002/sanphammoi",
        success:function (datas) {
            console.log(datas);
            datas.forEach((item) => {
                    $(".glide__slides").append(`
                    <li class="glide__slide">
        <div class="product-wrap">
            <div class="product">
                <div class="product-img">
        <img src="../img/${item.hinh}" width="300x" height="380px" alt="">
                </div>
                <div class="product-info">
                 <p>${item.tensp}</p>
                 <p class="product-price">${item.dongia}vnđ</p>
                 <a  class ="a-muangay" href="product-description.html?id=${item.masp}"><button class="btn-product-muangay">XEM CHI TIẾT</button> </a>                 
                </div>
            </div>
        </div>
    </li>
                    `)
            });
           
            
        }
    })
    var x= callApi("GET","sanpham",obj)
    console.log(x);
    x.forEach((item)=>{
        $(".new-arrival-list").append(`
        <div class="product-wrap">
        <div class="product">
            <div class="product-img">
    <img src="../img/${item.hinh}" width="300x" height="380px" alt="">
            </div>
            <div class="product-info">
             <p>${item.tensp}</p>
             <p class="product-price">${item.dongia}vnđ</p>
             <a  class ="a-muangay" href="product-description.html?id=${item.masp}"><button class="btn-product-muangay">XEM CHI TIẾT</button> </a>                 
             
            </div>
            
        </div>
    </div>
        `)
    });
})
$(document).on("click",".view-all-product", function () {  
   
obj.page++;
console.log(obj);
    var x= callApi("GET","sanpham",obj)
    console.log(x);
    x.forEach((item)=>{
        $(".new-arrival-list").append(`
        <div class="product-wrap">
        <div class="product">
            <div class="product-img">
    <img src="../img/${item.hinh}" width="300x" height="380px" alt="">
            </div>
            <div class="product-info">
             <p>${item.tensp}</p>
             <p class="product-price">${item.dongia}vnđ</p>
             <a  class ="a-muangay" href="product-description.html?id=${item.masp}"><button class="btn-product-muangay">XEM CHI TIẾT</button> </a>                 
              
            </div>
            
        </div>
    </div>
        `)
    });
})
console.log(obj);
function callApi(method, endpoint = "", data = null) {
    var datar;
    $.ajax({
      async: false,
      type: method,
        url: "http://localhost:3002/" + endpoint,
      headers: { "Content-Type": "application/json" },
    
      data: data,
    
      success: function (data) {
        datar = data;
      },
    });
    return datar;
  }
 
  window.addEventListener('DOMContentLoaded', function () {

    
    

  })
  