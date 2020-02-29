
firebase.auth().signOut();

document.getElementById("login_btn").addEventListener("click",login);
document.getElementById("loading-spinner").style.display = "none";
document.getElementById("main-content").style.display = "block";

function login(){
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("main-content").style.display = "none";
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(message){
        window.location = "home.html"
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      window.alert("Error : " + errorMessage);
    });
  
  }