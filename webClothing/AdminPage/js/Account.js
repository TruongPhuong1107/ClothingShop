var placeAdd = document.getElementsByClassName("placeAdd")[0];

$(document).ready(function () {
  $(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3002/taikhoan/",

      success: function (datas) {
        sessionStorage.setItem("Accounts", JSON.stringify(datas));
        var x = 0;
        datas.forEach((data) => {
          x++;
          sessionStorage.setItem("values", x);
          $("#placeAdd").append(
            `<tr>
              <td style="width: auto" class="idAccount">
              ${x}
              </td>

              <td style="width: auto" class="text-center">
              ${data.tenchutk}
              </td> 
              <td style="width: auto"class="text-center">
              ${data.sdt}
              </td>
              <td style="width: auto" class="text-center">
              ${data.diachi}
              </td> 
              
              <td class="project-state text-center overflowhide">
              ${data.email}
              </td>
              <td style="width: auto " class="text-left" >
                <select class="selectOptionAuthor" datar="${
                  data.matk
                }" class="form-control form-control-lg " >
                    ${
                      !data.role_id
                        ? "<option value = 0 selected  >User</option>  <option value = 1 >Admin</option>"
                        : "<option value = 0  >User</option><option selected  value = 1  >Admin</option>"
                    }

                </select>
             </td> 
              <td class="project-actions text-right"style="width: auto ">
                 
                  <a class="btn btn-info btn-sm" href="EditAccount.html?id=${
                    data.matk
                  }">
                      <i class="fas fa-pencil-alt">
                      </i>
                      <span >Edit</span>
                  </a>
                
                  <a class="btnDelete" href="#", data-item = "">
                              <i class="fas fa-trash" getID=${
                                data.matk
                              } onclick="removeAccount(this)">
                              </i>
                           
                            
                          </a>
                          
              </td>
          </tr>
          `
          );
        });
      },
    });
  });

  $(document).on("change", ".selectOptionAuthor", function () {
 
      let tmp ={
        "role_id": $(this).val(),
        "matk": $(this).attr("datar")
      }
      tmp = JSON.stringify(tmp);
      try{
        let data=  callApi("PUT","admin/taikhoan",tmp);
        console.log(data);
      }catch{
        alert("Error")
      }

  })
});


function removeAccount(event) {
  event = window.event;
  if (confirm("Bạn có chắc muốn xóa tài khoản  này không?")) {
    $.ajax({
      type: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://localhost:3002/taikhoan/${event.target.getAttribute(
        "getID"
      )}`,
      success: function (data) {
        alert("Success");
        console.log(data);
       window.location="../Account.html";
      },
    });
  } else {
    return ;
  }
}


function callApi(method, endpoint = "", data = null) {
  var datar;
  $.ajax({
    async: false,
    type: method,
    url: "http://localhost:3002/" + endpoint,
    data: data,
    headers: { "Content-Type": "application/json" },
    success: function (data) {
      datar = data;
    },
  });
  return datar;
}

////////////////////////////
