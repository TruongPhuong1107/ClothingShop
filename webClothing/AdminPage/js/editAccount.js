var queryDict = {}

location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})


$(document).ready(function () {
    $(function () {
      $.ajax({
        async: false,
        type: "GET",
        url: `http://localhost:3002/taikhoan/${queryDict.id}`,
        success: function (datas) {
             let data=datas;
              $("#placeAdd").append(
                `
                <div class="contentCont">
                <div class="infoUser Left">
                    <div class="subInfo">
                        <div class="info">ID</div>
                        <input type="text" id="id" class="inputField" value="${data.matk}">
                    </div> 
                    <div class="subInfo">
                        <div class="info">Họ và tên</div>
                        <input type="text" id="name" class="inputField" value="${data.tenchutk}">
                    </div>
                    <div class="subInfo">
                        <div class="info">Số điện thoại</div>
                        <input type="text" id="phone" class="inputField" value="${data.sdt}">
                    </div>
                    <div class="subInfo">
                        <div class="info"> Địa chỉ</div>
                        <input type="text" id="address" class="inputField" value=${data.diachi}>
                    </div>
                    
                    <div class="subInfo">
                    <div class="info"> ngaysinh</div>
                    <input type="date" id="date" class="inputField" value=${data.ngaysinh}>
                </div>
                </div>
                <div class="infoUser Right">
                <div class="subInfo">
                <div class="info">Địa chỉ Email</div>
                <input type="text" id="email"  class="inputField" value=${data.email}>
            </div>
            <div class="subInfo">
           
           
            
        </div>
                    
                    
                    <div class="btnAccept" onclick="adjustAccount()" >Xác Nhận</div>
                </div>
            </div>
    `
              )
        },
      });
    });
    

});


////////////////////// post SP


function adjustAccount()
{
    let phone=document.getElementById("phone").value;
    let address=document.getElementById("address").value;
    let email=document.getElementById("email").value;
    let name =document.getElementById("name").value;
    let date=document.querySelector("#date").value;
    
    let obj={
        "tenchutk":name,
        "sdt": phone,
        "diachi": address,
        "email": email,
        "ngaysinh":date
    }
    console.log(obj);
    $.ajax({
        type:"PUT",
        headers: { 
          
            'Content-Type': 'application/json' 
        },
        url: `http://localhost:3002/taikhoan/${queryDict.id}`,
        data:JSON.stringify(obj),
        success:function(data)
        {
            alert("Success");
            window.location="./Account.html"
            
        },

    })
    
}

