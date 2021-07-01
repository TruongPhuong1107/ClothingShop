var queryDic={};
location.search.substr(1).split("&").forEach(function(item) {queryDic[item.split("=")[0]]=item.split("=")[1]} )
$(document).ready(function () {
   $.ajax({
       type:"GET",
       url:`http://localhost:3002/sanphamLoai/${queryDic.id}`,
       success: function (datas) {
          datas.forEach( (items) => {
              $(".main-product-list").append(
          `
          <div class="product-wrap">
          <div class="product">
              <div class="product-img">
      <img src="../img/${items.hinh}" width="300x" height="380px" alt="">
              </div>
              <div class="product-info">
               <p>${items.tensp}</p>
               <p class="product-price">${items.dongia} vnđ</p>
               <a  class ="a-muangay" href="product-description.html?id=${items.masp}"><button class="btn-product-muangay">XEM CHI TIẾT</button> </a> 
              </div>
              
          </div>
      </div>`)
          });
      }
   })
})

