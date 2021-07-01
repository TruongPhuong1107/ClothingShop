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
$('.search').keypress(function(event) {
    var value= document.querySelector(".search").value;
    if (event.keyCode == 13 || event.which == 13) {
       window.location=`./search.html?value=${value}`;
       }
   });
//////kiểm tra login-logout////////////////////
function logOut(){
	sessionStorage.removeItem("userInfo");
	return;
  }
  
  window.addEventListener('DOMContentLoaded', (event) => {
	if (sessionStorage.getItem("userInfo") !== null) {
	  document.getElementById('login-check').innerHTML=
	  `<span id="button">
		  <i class="far fa-handshake" ></i><span style="font-size:15px; margin: 0 10px; font-weight:bold">Xin chào ${JSON.parse(sessionStorage.getItem("userInfo")).tenchutk}</span> 
		  <a onclick="logOut()" href="./index.html" class="logout">Đăng xuất</a>
		</span>  
	  `
	}
	else{
	document.getElementById('login-check').innerHTML = 
	`<a href="login.html"><i  class="fas fa-user"></i></a>`
	}
  });


