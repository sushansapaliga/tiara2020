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

  const db = firebase.firestore();

  document.getElementById("regStudent").addEventListener("click",validateStudent);

  var collegeName = [];
  var collegeCode = [];
  var collegeID = [];
  var colID = "";
  var colCode = "";
  var studentSID = "";

function loadIt(){
    document.getElementById("loading-spinner").style.display="block";
    document.getElementById("main-content").style.display="none";
}

function showIt(){
    document.getElementById("loading-spinner").style.display="none";
    document.getElementById("main-content").style.display="block";
}

function onLoad(){
    var collegeList = "";
    var i=0;
    db.collection("college")
    .orderBy("college_name")
    .get().then((snapShot)=>{
        snapShot.docs.forEach(doc=>{
            collegeList = collegeList + "<option id='o"+ i +"'>"+ doc.data()["college_name"] +"</option>";
            collegeName.push(doc.data()["college_name"]);
            collegeCode.push(doc.data()["college_code"]);
            collegeID.push(doc.data()["college_id"]);
            i++;
        });
        document.getElementById("collegeList").innerHTML = collegeList ;
        if(i==0){
            window.location = "index.html";
        }
        showIt();
    });
}

function validateStudent(){
    loadIt();

    var email = document.getElementById("email").value.trim()  ;
    var name = document.getElementById("name").value.trim() ;
    var contact = document.getElementById("contact").value.trim() ;
    var conf_email = document.getElementById("conf_email").value.trim() ;
    var check = document.getElementById("checked").checked;
    var college = document.getElementById("collegeList").value.trim();

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if(name == ""){
        disp(1,"Enter your name.");
        showIt();
        return;
    }else if( format.test(name) ){
        disp(1,"Your name has special character.");
        showIt();
        return;
    }else if(name.length >= 100){
        disp(1,"Your name's character length exceeded the limit.");
        showIt();
        return;
    }else if(contact.length != 10){
        disp(1,"Invalid contact number.");
        showIt();
        return;
    }else if(!ValidateEmail(email)){
        disp(1,"Invalid email ID.");
        showIt();
        return;
    }else if(email.localeCompare(conf_email) != 0){
        disp(1,"Email ID doesn't match.");
        showIt();
        return;
    }else if(collegeName.indexOf(college) == -1){
        disp(1,"Please select a valid college name.");
        showIt();
        return;
    }else if(!check){
        disp(1,"Please agree to the terms and conditions.");
        showIt();
        return;
    }else{
        var indexCol = collegeName.indexOf(college);
        colID = collegeID[indexCol];
        colCode = collegeCode[indexCol];
        checkStudent();
    }
}

function findValidSID(){
    studentSID = r();
    db.collection("student")
    .where("sid","==",studentSID)
    .get().then((snapShot)=>{
        var i =0;
        snapShot.docs.forEach(doc=>{
            i++;
        });
        if(i==0){
            registerStudent();
        }else{
            findValidSID();
        }
    });
}

function checkStudent(){
    var email = document.getElementById("email").value.trim();
    db.collection("student")
    .where("email","==",email)
    .get().then((snapShot)=>{
        var i = 0;
        snapShot.docs.forEach(doc=>{
            i++;
        });
        if(i==0){
            findValidSID();
        }else{
            disp(1,"You have already registered for the TIARA 2K20.");
            showIt();
        }
    });
}

function registerStudent(){
    var email = document.getElementById("email").value.trim();
    var name = document.getElementById("name").value.trim();
    var contact = document.getElementById("contact").value.trim();
    var college = document.getElementById("collegeList").value.trim();

    db.collection("student")
    .add({
        college_id : colID,
        college_name : college,
        contact: contact,
        email: email,
        name: name,
        sid: studentSID
    }).then((snapShot=0)=>{
        sendMail(name,email,studentSID);
        disp(2,"Hi "+name+",<br>You have successfully register for Tiara 2k20. Kindly check your email for more information.<br><br>Your SID is <b style='color:#ff4528;font-size:18px'>"+ studentSID +"</b>.You can now use this SID to register for events (MEGA events).<br><br><b style='color:#ff4528'>NOTE: Please take screenshot of this for future reference.</b>. ");
    });
}

function gsid(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
 }

function r(){
        var a = gsid(6, '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ');
        var cn = colCode;
        var ne = cn+a;
        return ne;
 }

 function sendMail(name, email, sid){
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true ); 
        anHttpRequest.send( null ); 
        }
    }
    var theurl='https://script.google.com/macros/s/AKfycbzlREPI2t2Zt6CODRUxuj0QYz0gLnBEbi1y4ASzI1NDvAh-ucg/exec?name=' + name +"&email=" +email+ "&student_sid="+sid;
    var client = new HttpClient();
    client.get(theurl, function(response) { 
        var response1 = JSON.parse(response);
        //document.getElementById("print").innerHTML = response1.status ;
    }); 
 }

function ValidateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat)){
        return true;
    }else{
        return false;
    }
}

onLoad();