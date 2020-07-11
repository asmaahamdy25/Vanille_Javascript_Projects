const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input , errorMessage){
    const formControl = input.parentElement;
    formControl.className = ' form-control error';
    const small = formControl.querySelector('small');
    small.innerText = errorMessage
}

function showSuccess(input ){
    const formControl = input.parentElement;
    formControl.className = ' form-control succes';
}
function checkRequired(inputArr) {
    inputArr.forEach(function (input){
        if(input.value.trim() === ''){
            showError(input , `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }

    })
}

function checkLength(input,min,max){
    if(input.value.length < min || input.value.length > max){
        showError(input , `${getFieldName(input)} must be between ${min} and ${max} `)
    } else{
        showSuccess(input)
    }
}


function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}


function checkEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(re.test(String(email).toLowerCase())){
        showSuccess(email)
    } else {
        showError(email , `Email is not valid `)
    }
}

function checkPasswordMatch(password ,password2){
    if(password.value != password2.value){
        showError(password2 , 'Confirm Password not match Password')
    } else{
        showSuccess(password2);
        showSuccess(password)
    }
}

form.addEventListener('submit' , function(e) {
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkLength(username , 3 ,15);
    checkLength(password ,6 ,25);
    checkEmail(email);
    checkPasswordMatch(password,password2)

   
})
