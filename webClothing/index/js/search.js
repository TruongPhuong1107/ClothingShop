var queryDic={};
location.search.substr(1).split("&").forEach(function(item) {queryDic[item.split("=")[0]]=item.split("=")[1]} )
$(document).ready(function () {
   $.ajax({
       type:"GET",
       url:`http://localhost:3002/search?value=${queryDic.value}`,
       headers: { 
        'Content-Type': 'application/json' 
      },
      success: function (data) {
        quantity.innerText = data.length;
          if(data!==null){
          data.forEach((item)=>{
              $(".search-product-list").append(
              ` <div class="product-wrap">
                  <div class="product">
                    <div class="product-img">
                        <img src="../img/${item.hinh}" width="300x" height="380px" alt="">
                    </div>
                    <div class="product-info">
                        <p>${item.tensp}</p>
                        <p class="product-price">${numberWithCommas(item.dongia)} vnđ</p>
                        <a  class ="a-muangay" href="product-description.html?id=${item.masp}"><button class="btn-product-muangay">XEM CHI TIẾT</button> </a>             
                    </div>                  
                  </div>
                </div>`)
          });
        }
      }
   })
})
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}