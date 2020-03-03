 
 var firebaseConfig = {
    apiKey: "AIzaSyA-MnNAZw6VVXQ8EjgeZmsNfGxKU5L7m4g",
    authDomain: "tiara-ec4f6.firebaseapp.com",
    databaseURL: "https://tiara-ec4f6.firebaseio.com",
    projectId: "tiara-ec4f6",
    storageBucket: "tiara-ec4f6.appspot.com",
    messagingSenderId: "149576170774",
    appId: "1:149576170774:web:75721e56f481ec72202437",
    measurementId: "G-MMSJBV2NSX"
  };
 
  firebase.initializeApp(firebaseConfig);
 
   

function signup(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var college = document.getElementById("col").value;
     
  firebase.auth().createUserWithEmailAndPassword(email, password ).catch(function(error) {
 
  var errorCode = error.code;
  var errorMessage = error.message;
 
      const ref = firebase.database().ref("users");
    var data = {
        email:email,
        password:password,
        college:college
    }
    ref.push(data);
    alert(email +" for "+college+" Added successfully");
});
}

function logout(){
     
    
    
}

