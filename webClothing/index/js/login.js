function goiAPI(method, endpoint, data=null) {
    var datar;
     $.ajax({
        type:method,
        async:false,
        data:data,
        url:`http://localhost:3002/`+endpoint,
        success:function(data){
            datar=data;
        }})
    return datar;
}

//xử lí đăng nhập
var err = document.getElementsByClassName('error');
validator({
    form: "#formLogin",
    formGroupSelector: '.form-group',
    rules: [
        validator.isRequired("#username"),
        validator.isRequired("#password"),
    ],
    onSubmit: function (data) {
        console.log(data)
        let test = goiAPI("GET","CheckLogin",data);
        if(test){
            sessionStorage.setItem("userInfo", JSON.stringify(test));
            console.log(JSON.parse(sessionStorage.getItem("userInfo")).role_id);
            if (JSON.parse(sessionStorage.getItem("userInfo")).role_id == 1){
                window.location="../AdminPage/index.html";
            }
            else {
                console.log(JSON.parse(sessionStorage.getItem("userInfo")).role_id);
                window.location="./index.html"; 
            }
        }
        else{
            err[0].innerText = 'Tên đăng nhập hoặc mật khẩu không đúng';
        }
    }
})
  