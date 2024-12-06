var userEmailInput = document.getElementById("userEmailInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var userNameInput = document.getElementById("userNameInput");
var SubmitBtn = document.getElementById("Submit");

userEmailInput.addEventListener("input", function (e) {
  if (
    !isValidInput(/^[A-Za-z][0-9A-Za-z_\.]{0,}@gmail\.com$/, e.target.value)
  ) {
    userEmailInput.classList.add("is-invalid");
  } else {
    userEmailInput.classList.remove("is-invalid");
    userEmailInput.classList.add("is-valid");
  }
});

userPasswordInput.addEventListener("input", function (e) {
  if (!isValidInput(/^[A-Za-z0-9]{1,}$/, e.target.value)) {
    userPasswordInput.classList.add("is-invalid");
  } else {
    userPasswordInput.classList.remove("is-invalid");
    userPasswordInput.classList.add("is-valid");
  }
});

userNameInput.addEventListener("input", function (e) {
  if (!isValidInput(/^[A-Za-z0-9]{3,}$/, e.target.value)) {
    userNameInput.classList.add("is-invalid");
  } else {
    userNameInput.classList.remove("is-invalid");
    userNameInput.classList.add("is-valid");
  }
});

SubmitBtn.addEventListener("click", function () {
  if (isValidForm()) {
    var user = {
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
      role :"User"
    };
    SignUp(user)
  }
});

function isValidInput(Regex, value) {
  return Regex.test(value);
}

function isValidForm() {
  var valid = true;
  if (
    !isValidInput(
      /^[A-Za-z][0-9A-Za-z_\.]{0,}@gmail\.com$/,
      userEmailInput.value
    )
  ) {
    valid = false;
    userEmailInput.classList.add("is-invalid");
  }
  if (!isValidInput(/^[A-Za-z0-9]{1,}$/, userPasswordInput.value)) {
    userPasswordInput.classList.add("is-invalid");
    valid = false;
  }
  if (!isValidInput(/^[A-Za-z0-9]{3,}$/,userNameInput.value)) {
    userNameInput.classList.add("is-invalid");
    valid = false;
  }
  return valid;
}




const SignUp = async (payload)=>{

    var res = await fetch("http://127.0.0.1:8000/api/Signup", {
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
            "Content-Type":"application/json"
        }
    })
    var data = await res.json();
    var status = data.status ;
    if(status == 201){
        window.location.href = "index.html" 
    }
    console.log(data);
}


// function SignUp(payload){
//     var http = new XMLHttpRequest();
//     http.open("POST" , "http://127.0.0.1:8000/api/Signup");;
//     http.setRequestHeader("Content-Type", "application/json");
//     http.send(JSON.stringify(payload))
//     http.addEventListener("readystatechange" , function(){
//         var state = http.readyState;
//         if(state == 4){
//             var status = JSON.parse( http.responseText).status;
//             var data = JSON.parse( http.responseText).MSG
//             if(status == 201){
//                 window.location.href = "/index.html" 
//             }
            
//         }
//     })
// }
