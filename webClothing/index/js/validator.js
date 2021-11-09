function validator(object) {
    let selectorRules = {}
    let formElement = document.querySelector(object.form);
    function getParent (element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
            return element.parentElement
            }
            element = element.parentElement;
        }
    }
    function validate (inputElement, rule, errorSpan ) {
        let errorMessage;
        let rules = selectorRules[rule.selector];
        for(let i = 0; i<rules.length; i++){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
        if(errorMessage) {
            console.log(errorMessage);
            errorSpan.innerText = errorMessage;
            getParent(inputElement, object.formGroupSelector).classList.add('invalid')
        }
        else {
            errorSpan.innerText = "";
            getParent(inputElement, object.formGroupSelector).classList.remove('invalid')
        }
        return !errorMessage;
    }
    if(formElement){ 
        formElement.onsubmit= e => {
            e.preventDefault();
            let isFormValid = true;
            object.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector);
                const errorSpan = getParent(inputElement, object.formGroupSelector).querySelector(".form-message");
                var isValid = validate(inputElement,rule,errorSpan);
                if(!isValid){
                    isFormValid = false;
                }
            })
            
            if(isFormValid){
                if( typeof object.onSubmit === 'function'){
                    let inputs = formElement.querySelectorAll('[name]:not(.re-password)');
                    let formValues = Array.from(inputs).reduce ((values, input) => {
                        (values[input.name] = input.value)
                        return  values;

                },{})
                object.onSubmit(formValues);
                }
            }
        }
        object.rules.forEach(rule => {
            const inputElement = formElement.querySelector(rule.selector);
            const errorSpan = getParent(inputElement, object.formGroupSelector).querySelector(".form-message");
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test]

            }
            if(inputElement){
                inputElement.onblur = () => {
                    validate(inputElement,rule,errorSpan);
                }
                inputElement.oninput = () => {
                    errorSpan.innerText = "";
                    getParent(inputElement, object.formGroupSelector).classList.remove('invalid')
                }
            }
        });
    }


}

validator.isEmail = function(selector){
    return {
        selector,
        test: function(value){
            const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            return reg.test(value) ? undefined : 'Vui lòng nhập đúng email'
        }
    }

}

validator.isRequired = function(selector){
    return{
        selector: selector,
        test(value){
            return value.trim() ? undefined : 'Vui lòng nhập thông tin';
        }
    }
}

validator.minLength = function(selector,min, message){
    return{
        selector: selector,
        test(value){
            return value.length >= 6 ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}
validator.maxLength = function(selector, max){
    return{
        selector,
        test(value){
            return value.length <= max ? undefined : `Tên đăng nhập chỉ tối đa ${max} ký tự`;
        }
    }
}
validator.isConfirmed = function (selector, confirmValue) {
    return {
        selector,
        test(value){
            return value === confirmValue() ? undefined : 'Mật khẩu không khớp'
        }
    }
}

