
author = 1;
$(document).ready(function () {
  document.getElementById('author1').onclick = function (e) {
    if (this.checked) {
      author = 1;
      document.getElementById("author2").checked = 0;
    }
  };
  document.getElementById('author2').onclick = async function (e) {
    if (this.checked) {
      author=0;
      document.getElementById("author1").checked = 0;
    }
  };

});

function addAccount() {
  var date =document.querySelector("#date").value;
  var user = document.getElementById("user").value;
  var password = document.getElementById("pass").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;

  var obj = {
      "tenchutk": user,
      "matkhau":password,
      "role_id":author,
      "tendn":username,
      "sdt":phone,
      "ngaysinh":date,
      "diachi":address,
      "email":email,

  };
    $.ajax({
      type: "POST",
      headers: { 

        'Content-Type': 'application/json' 
    },
      url: "http://localhost:3002/taikhoan",
      data : JSON.stringify(obj),
      success:function(data)
      {
          alert("Success");
          console.log(data);
      },

    })


}