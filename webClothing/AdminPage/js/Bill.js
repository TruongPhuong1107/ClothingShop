$(document).ready(function () {
  $("#dateBegin").val("2020-11-01");
  $("#dateEnd").val("2020-12-31");

  let obj = {
    page:1,
    limit:100
  }
  


  searchBill(obj);
 
  


});


$("#btnSearch").on("click",()=>{

  $("#tbodybill").empty();
  let obj = {
    field:"nameUser",
    value:$("#ipSearch").val(),
    dateBegin: $("#dateBegin").val(),
    dateEnd:$("#dateEnd").val(),
    page:1,
    limit:100
  }
  searchBill(obj)

})


function searchBill(obj){
  callApi("GET", "hoadon",obj).forEach((bill) => {
    // console.log(tmp)

    $("#tbodybill").append(
      `
            <tr>
            <td style="width: 8%">
                ${bill.mahd}
            </td>
            <td style="width: 12%">
                ${bill.makh}
            </td>
            <td style="width: 10%">
                ${bill.ngaylap}
            </td>

            
            <td style="width: 7%" >
                ${numberWithCommas(bill.tongtien)} vnđ
          </td>
  
            <td style="width: 10% " >
                <select class="selectOption" datar="${bill.mahd}" class="form-control form-control-lg " >
                    ${!bill.trangthai?"<option value = 0 selected  >Chưa thanh toán</option>  <option value = 1 >Đã thanh toán</option>":"<option value = 0  >Chưa thanh toán</option><option selected  value = 1  >Đã thanh toán</option>"}

                </select>
            </td> 
            
            <td class="project-actions "style="width: 16% ">
                 
                <a class="btn btn-info btn-sm" href="./BillInfo.html?mahd=${bill.mahd}">
                    <i class="fas fa-pencil-alt">
                    </i>
                    <button style="color: white;font-weight: bold" datar="${bill.mahd}"  type="button" class="btn btnView"  data-toggle="modal" data-target=".bd-example-modal-lg"  >Xem</button>
                </a>
                <a class="btn btn-info btn-sm" href="#">
                <i class="fas fa-trash">
                </i>
                <button style="color: white;font-weight: bold" type="button" class="btn btnDelete" datar=${bill.mahd} >Xóa</button>
            </a>
              
            </td>
        </tr>
        
            `
    );
  
  });
}



$(document).on('click',".btnDelete",function(){
  

  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
        
  try{
   
    $.ajax({
      async: false,
      type: "DELETE",
      url: "http://localhost:3002/hoadons/" + $(this).attr("datar"),
      success: function (data) {
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          button: "Aww yiss!",
        }).then(()=>{
          location.reload();
        });
      
       
      },
    });


  }catch{
    swal("Error");
  }
    } else {
      swal("Your imaginary file is safe!");
    }
  });
 



 
})




$(document).on("change", ".selectOption", function () {
    let tmp = {
      "mahd":$(this).attr('datar'),
      "trangthai":$(this).val()
    }
    tmp = JSON.stringify(tmp);
    console.log(tmp);
    try{
      let data=  callApi("PUT","hoadons",tmp);
      swal("Good job!", "You clicked the button!", "success");
    }catch{
      alert("Error")
    }

})

function callApi(method, endpoint = "", data = null) {
  var datar;
  $.ajax({
    async: false,
    type: method,
    headers: { "Content-Type": "application/json" },
    url: "http://localhost:3002/" + endpoint,
    data: data,
  
    success: function (data) {
      datar = data;
    },
  });
  return datar;
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}