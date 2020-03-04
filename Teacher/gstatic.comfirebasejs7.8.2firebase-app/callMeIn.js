var firebaseConfig = {
  apiKey: "AIzaSyDJ5N734amKIPxuIqBfvW9c1_Y4OQ9gwjQ",
  authDomain: "tiarareg-9672a.firebaseapp.com",
  databaseURL: "https://tiarareg-9672a.firebaseio.com",
  projectId: "tiarareg-9672a",
  storageBucket: "tiarareg-9672a.appspot.com",
  messagingSenderId: "617156753642",
  appId: "1:617156753642:web:3ff00b1ef1ee170b677f93",
  measurementId: "G-F91FECFKPK"
};
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

firebase.auth().signOut();

document.getElementById("login_btn").addEventListener("click",login);
document.getElementById("loading-spinner").style.display = "none";
document.getElementById("main-content").style.display = "block";

$(document).keydown(function(e){
  if(e.which === 123){
     return false;
  }
});

function login(){
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("main-content").style.display = "none";
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(message){
        window.location = "index.html"
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      window.alert("Error : " + errorMessage);
    });
  
  }