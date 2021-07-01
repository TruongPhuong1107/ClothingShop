var getProduct= JSON.parse(sessionStorage.getItem("product"));

$(document).ready(  function(){
var total=0;
for(var i=0;i<getProduct.length;i++){
$("#product-cart").append(
`
<tr><td>
                    <img src="${getProduct[i].hinh}" width="50px" height="70px" height: 50px; alt="">
                    </td>
                    <td id="tensp" class="tensp">${getProduct[i].tensp}</td>
                    <td >
                    <div class="buttons_added">
                    <input class="minus is-form" id="minus" type="button" value="-">
                    <input aria-label="quantity" class="input-qty" max="100" min="1" name="" type="number" value="${getProduct[i].soluong}">
                    <input class="plus is-form" id="plus" type="button" value="+">
                    </div>   
                    </td>
                    <td>
                    <span>${getProduct[i].tenmau}, ${getProduct[i].tenkt}</span>
                </td>
                    <td id="dongia">
                        ${numberWithCommas(getProduct[i].dongia)} vnđ
                    </td>
                    <td><button value="Xóa" onclick="" class="delete">Xóa</button></td></tr>`
)
total+=(Number(getProduct[i].soluong)*Number(getProduct[i].dongia));
}


console.log(total)
$("#product-cart").append(`<tr >
<td class="total"></td>
<td class="total" >Tổng tiền:</td>
<td class="total" id="total">${numberWithCommas(total)} vnđ</td>

</tr>`
)

$('input.input-qty').each(function() {
    var $this = $(this),
      qty = $this.parent().find('.is-form'),
      min = Number($this.attr('min')),
      value=Number($this.attr('value')),
      max = Number($this.attr('max'))
    if (min == 0) {
      var d = 0
    } else d = value
    $(qty).on('click', function() {
      if ($(this).hasClass('minus')) {
        if (d > min) d += -1
      } else if ($(this).hasClass('plus')) {
        var x = Number($this.val()) + 1
        if (x <= max) d += 1
      }
      $this.attr('value', d).val(d)
    })
  })
 var minus=document.getElementsByClassName("minus");
 var plus=document.getElementsByClassName("plus");
 var name=document.getElementById("tensp").innerText;
 var total=document.getElementById("total");
var xoa =document.getElementsByClassName("delete");
 const updateCart =(e)=>{
   var getparent =e.target.parentElement.parentElement;
    for(var i=0;i<getProduct.length;i++){
        if(getProduct[i].tensp===name){
            if(e.target.value==="-"){
               getProduct[i].soluong--;
               
            }
            else if(e.target.value==="+"){
         
               getProduct[i].soluong++;
           }
           else if(e.target.value==="Xóa") {
             alert(e.target.value);
              getparent.style.display="none";
              getProduct.splice(i,1);
  
          }
      
           }
           
    }
    sessionStorage.setItem("product", JSON.stringify(getProduct));
    var dataObj=JSON.parse(sessionStorage.getItem("product"));
    var tong=0;
    for(var i=0;i<dataObj.length;i++){
        tong+=(Number(dataObj[i].dongia)*Number(dataObj[i].soluong))
    }
    total.innerText=numberWithCommas(tong) + "vnđ" ;
}
for(var i=0;i<minus.length;i++){
 minus[i].addEventListener("click",updateCart);
 plus[i].addEventListener("click",updateCart);
}

for(var i=0;i<xoa.length;i++){
xoa[i].addEventListener("click",updateCart);
}
})
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}