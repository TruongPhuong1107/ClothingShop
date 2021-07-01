
function kiemtra_register(){
    $("#myform").validate({
        rules: {
            hoten: "required",
            ngaysinh: "required",
            sdt: "required",
            email:{
                required:true,
                email:true
            } ,

            sdt:
            {
                required:true,
                minlength:10
            },
            diachi: {
                required: true,
                minlength: 2
            },
            tendn:"required",
            matkhau: {
                required: true,
                minlength: 5
            },
            matkhaulai: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
        },
        messages: {
            hoten: "Vui lòng nhập họ tên",
            ngaysinh: "Vui lòng nhập ngày sinh",
            diachi: {
                required: "Vui lòng nhập địa chỉ",
                minlength: "Vui lòng nhập chính xác địa chỉ"
            },
            email:
            {
                required:"Vui lòng nhập email",
                email:"Vui lòng nhập đúng form email"
            },
       
        sdt:{
            required:"Vui lòng nhập số điện thoại",
            minlength:"Vui lòng nhập đúng số điện thoại"
        },
        tendn:"Vui lòng nhập tên đăng nhập",
        matkhau: {
            required: 'Vui lòng nhập mật khẩu',
            minlength: 'Vui lòng nhập ít nhất 5 kí tự'
        },
        matkhaulai: {
            required: 'Vui lòng nhập lại mật khẩu',
            minlength: 'Vui lòng nhập ít nhất 5 kí tự',
            equalTo: 'Mật khẩu không trùng'
        },
    },
        submitHandler: function(form) {
            form.submit();
        }
    });
}
kiemtra_register();
function kiemtra_login(){
$("#form-login").validate(
    {
        rules:{
   tendn:"required",
   matkhau:"required"
    },

messages: {
    tendn:"vui lòng điền tên đăng nhập",
    matkhau:"Vui lòng điền mật khẩu"
},
submitHandler:function (form) {
    form.submit();
}
});
}
kiemtra_login();
 async function goiAPI(method, endpoint, data=null) {
    var datar;
    await $.ajax({
        type:method,
        data:data,
        url:`http://localhost:3002/`+endpoint,
        success:function(data){
            datar=data;
        },
        error: function() {
            alert("có lỗi");
          }
        })
    
    return datar;
}

/////////////xử lý đang////

 async function login() {
var name= $('#username').val();
var pass = $('#password').val();
console.log(name);
var test = await  goiAPI("GET","CheckLogin",{"tendn":name, "matkhau":pass});
  
        if(test){
            sessionStorage.setItem("userInfo", JSON.stringify(test));
            console.log(JSON.parse(sessionStorage.getItem("userInfo")).role_id);
        if (JSON.parse(sessionStorage.getItem("userInfo")).role_id == 1){
            window.location="../AdminPage/"
        }
        else {
            console.log(JSON.parse(sessionStorage.getItem("userInfo")).role_id);
          window.location="./index.html"; 
        }
    
    }
    else{
        $(".error").append(
            `<span>đăng nhập không thành công</span>`
        )
    }
}

function Register() {
    var hoten = document.querySelector(".name").value;
    var ngaysinh = document.querySelector(".date").value;
    var email = document.querySelector(".email").value;
    var diachi = document.querySelector(".address").value;
    var sdt = document.querySelector(".phone-number").value;
    var matkhau = document.querySelector(".password").value;
    var tendn = document.querySelector(".username").value;
    var obj={
        "tenchutk":hoten,
        "sdt":sdt,
        "email":email,
        "diachi":diachi,
        "ngaysinh":ngaysinh,
        "tendn":tendn,
        "matkhau":matkhau,
        "role_id":0
    }
    console.log(JSON.stringify(obj));
    $.ajax({
        type:"POST",
        headers: { 
            'Content-Type': 'application/json' 
        },
        url:"http://localhost:3002/taikhoan/",
        data:JSON.stringify(obj),
        success:function(data)
        {
            alert("Success");
            window.location="./login.html"
        },
        error: function () {
            alert("dfnkdjs");
        }
    })
}
