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
      (function () {
        const loaderEl = document.querySelector('.loading');
        function showProducts(products){
            products.forEach((item)=>{
                $(".new-arrival-list").append(`
                <div class="product-wrap">
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
                </div>
                `)
            });
        }
        function hideLoading() {
            loaderEl.classList.remove("show");  
        }
        function showLoading(){
            loaderEl.classList.add("show");
        }
        const hasMoreProducts = (page, limit, total) => {
            const startIndex = (page - 1) * limit + 1;
            return total === 0 || startIndex < total;
        };
        const loadProducts = async (page, limit) => {
            setTimeout(async () => {
                try {
                    if (hasMoreProducts(page, limit, total)) {
                        const response = await callApi("GET","sanpham",{page,limit});
                        showProducts(response);
                        total = 12; //api nó hơi lỗi nên phải set v ạ :D
                    }
                } catch (error) {
                    console.log(error.message);
                } finally {
                    hideLoading();
                }
            }, 1000);
        };
        let currentPage = 1;
        const limit = 3;
        let total = 0;
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 5 &&
                hasMoreProducts(currentPage, limit, total)) {
                console.log(limit);
                currentPage++;
                showLoading();
                loadProducts(currentPage, limit);                
            }
        }, {
            passive: true
        });
        loadProducts(currentPage, limit);
      })();
  })
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var collectionItem = document.querySelectorAll('.collectionItem');
for(let item of collectionItem){
    item.addEventListener('click', () => {
        alert('em để vô cho đẹp chứ API hổng có :D')
    })
}