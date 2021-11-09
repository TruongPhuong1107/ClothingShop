window.addEventListener('DOMContentLoaded', (event) => {
$(window).scroll(function(){
  if($(this).scrollTop()){
    $('header').addClass('sticky');
  }
  else
  {
    $('header').removeClass('sticky');
  }
});
});
function icons() {
	var icon=document.querySelector('#icon-search')
	var arrow=document.querySelector('#arrow-right')
	var searchbox=document.querySelector('.search-box')
	var arrow=document.querySelector('#arrow-right')
	icon.onclick=function(){
	searchbox.style.display="block";     
	}
	arrow.onclick=function(){
		searchbox.style.display="none";
	}
}
icons();


////////XỬ LÝ LOAD DỮ LIỆU//////////////
var dropdown = document.getElementsByClassName("dropdown-content")[0];
$(document).ready(function () {
	$.ajax({
		type:"GET",
		url:"http://localhost:3002/loai",
		//dataType : 'json',
		success: function (datas) {
			console.log(datas);
			datas.forEach((items) => {
			
				$(".dropdown-content").append(
			      `<a href="product-category.html?id=${items.maloai}">${items.tenloai}</a>`
				)
			})
		}
	})
})
///////xử lí tìm kiếm////
function myFunction(id) {
	document.getElementById(id).classList.toggle("show");
}
var justify = document.getElementsByClassName('fa-align-justify');
//lấy tất cả các thẻ chứa menu con
var contents = document.getElementsByClassName('dropdown-content');
//lặp qua tất cả các button menu và gán sự kiện
for (var i = 0; i < justify.length; i++) {
	justify[i].addEventListener("click", function(){
		//lấy value của button
		var id = this.value;
		console.log(id);
		//ẩn tất cả các menu con đang được hiển thị
		for (var i = 0; i < contents.length; i++) {
			contents[i].classList.remove("show");
		}
		//hiển thị menu vừa được click
		myFunction(id);
	});
}
//nếu click ra ngoài các button thì ẩn tất cả các menu con
window.addEventListener("click", function(){
	 if (!event.target.matches('.fa-align-justify')){
		for (var i = 0; i < contents.length; i++) {
			contents[i].classList.remove("show");
		}
	 }
});

$('.search').keypress(function(event) {
    var value= document.querySelector(".search").value;
    if (event.keyCode == 13 || event.which == 13) {
       window.location=`./search.html?value=${value}`;
       }
   });
//////kiểm tra login-logout////////////////////
function logOut(){
	sessionStorage.removeItem("userInfo");
	sessionStorage.removeItem("product");
	window.location = './index.html'
	return;
}
  
  window.addEventListener('DOMContentLoaded', (event) => {
	if (sessionStorage.getItem("userInfo") !== null) {
	  document.getElementById('login-check').innerHTML=
	  `<span id="button">
	  		<a href="./BillInfo.html" > 
				<span >
					${JSON.parse(sessionStorage.getItem("userInfo")).tendn}
				</span> 
			</a>
		  	<a  onclick="logOut()"  class="logout"></a>
			<i class="fas fa-sign-out-alt" onclick="logOut()"></i>
		</span>  
	  `
	}
	else{
	document.getElementById('login-check').innerHTML = 
	`<a href="login.html"><i  class="fas fa-user"></i></a>`
	}
  });
// Xử lí chạy slide

