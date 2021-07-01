var btnAccept = document.getElementsByClassName('btnAccept')[0];
btnAccept.addEventListener('click',addCategory);

function addCategory()
{
    let cate = document.getElementById("category").value;
    let obj = {
        "tenloai":cate
    }
    $.ajax({
        type:"POST",
        headers: { 
          
            'Content-Type': 'application/json' 
        },
        url: "http://localhost:3002/loai",
        data:JSON.stringify(obj),
        success:function(data)
        {
            alert("Thêm thành công");
            console.log(data);
        },

    })

}