validator({
    form: '#formRegister',
    formGroupSelector: '.form-group',
    rules: [
        validator.isRequired('.name'),
        validator.isRequired('.date'),
        validator.isRequired('.phone-number'),
        validator.isRequired('.address'),
        validator.isRequired('.username'),
        validator.maxLength('.username',8),
        validator.isRequired('.email'),
        validator.isEmail('.email'),
        validator.isRequired('.password'),
        validator.isRequired('.re-password'),
        validator.isConfirmed('.re-password', () => {
            return document.querySelector('#formRegister #password').value;
        }),
    ],
    onSubmit: function (data){

        data.role_id = 0;
        $.ajax({
            type:"POST",
            headers: { 
                'Content-Type': 'application/json' 
            },
            url:"http://localhost:3002/taikhoan/",
            data:JSON.stringify(data),
            success:function()
            {
                window.location="./login.html"
            },
            error: function () {
                alert("Tạo tài khoản không thành công");
            }
        })
       
    }
});
