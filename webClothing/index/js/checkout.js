var btn=document.getElementById('btn-checkout');
function getBillInfo(){
    var inputs =document.querySelectorAll('[name]');
    let formValues = Array.from(inputs).reduce ((values, input) => {
        (values[input.name] = input.value)
        return  values;
    },{})
    sessionStorage.setItem("customerBill", JSON.stringify(formValues));
    window.location.href = './checkout-2.html'
}
if(sessionStorage.getItem("customerBill")!==null){
    sessionStorage.removeItem("customerBill")
}

btn.addEventListener ('click',getBillInfo);
