var user = JSON.parse( localStorage.getItem("user"))
if(user == null){
    window.location.href = "/index.html"
}
var nameDiv = document.querySelector("#h1")
var roleDiv = document.getElementById("h3")
var LogoutBtn = document.getElementById("LogoutBtn")
nameDiv.innerHTML = `<h1>${user.name}</h1>`;
roleDiv.innerHTML = `<h1>${user.role}</h1>`
LogoutBtn.addEventListener("click" , function(){
    localStorage.removeItem("user");
    window.location.href = "index.html"
})
