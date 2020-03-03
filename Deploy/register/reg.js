 
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
 
   

function signup(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var college = document.getElementById("col").value;
     
  firebase.auth().createUserWithEmailAndPassword(email, password )
  .then((data="0")=>{
    col();
  })
  .catch(function(error) {
 
  var errorCode = error.code;
  var errorMessage = error.message;
alert("teacher added successfully")
      
});
}

var db = firebase.firestore();

function col(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var college = document.getElementById("col").value;
    var code = document.getElementById("colc").value; 
    var a = 0;
    
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
console.log("login: " );
    window.alert("Error : " + errorMessage);
             
  });
    if (firebase.auth().currentUser !== null) 
        var uid = firebase.auth().currentUser.uid;
    console.log(uid);
    console.log(college);
    console.log(code);
    console.log(a);
    
    db.collection("college").doc().set({
        amount:a,
        college_code:code,
        college_id:uid,
        college_name:college
         
})
    .then(function() {
    console.log("Document successfully written!");
        alert("college added successfully")
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}
 