var userEmailInput = document.getElementById("userEmailInput");
var userPasswordInput = document.getElementById("userPasswordInput");
var SubmitBtn = document.getElementById("Submit");

var x= localStorage.getItem("user")

if(x){
  window.location.href="/Home.html" 
}

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

SubmitBtn.addEventListener("click", function () {
  if (isValidForm()) {
    var user = {
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    Login(user);
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
  return valid;
}

const Login = async (payload) => {
  SubmitBtn.setAttribute("disabled", "");
  SubmitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>`;
  var res = await fetch("http://127.0.0.1:8000/api/Signin", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  var data = await res.json();
  var status = data.status;
  if (status == 200) {
    var data = data.MSG;
    localStorage.setItem("user", JSON.stringify(data));
    SubmitBtn.removeAttribute("disabled");
    window.location.href = "Home.html"
    SubmitBtn.innerHTML = `Log in`;
  }
}

// function Login(payload) {
//   SubmitBtn.setAttribute("disabled", "");
//   SubmitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>`;
//   var http = new XMLHttpRequest();
//   http.open("POST", "http://127.0.0.1:8000/api/Signin");
//   http.setRequestHeader("Content-Type", "application/json");
//   http.send(JSON.stringify(payload));
//   http.addEventListener("readystatechange", function () {
//     var state = http.readyState; // 1 2 3 4
//     if (state == 4) {
//       var status = JSON.parse(http.responseText).status;
//       console.log(JSON.parse(http.responseText));

//       if (status == 200) {
//         var data = JSON.parse(http.responseText).MSG;
//         localStorage.setItem("user", JSON.stringify(data));
//         SubmitBtn.removeAttribute("disabled");
//         SubmitBtn.innerHTML = `Log in`;
//       }
//     }
//   });
// }
