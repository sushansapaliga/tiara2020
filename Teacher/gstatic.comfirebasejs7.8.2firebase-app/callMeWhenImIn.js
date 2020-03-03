var collegeId = "";
var collegeDocId = "";
var collegeName = "";
var collegeCode = "";
var collegeAmount = "";

loadIt();

function loadIt(){
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("main-content").style.display = "none";
}

function showIt(){
    document.getElementById("loading-spinner").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}

const db = firebase.firestore();

document.getElementById("logout_btn").addEventListener("click",logout);
document.getElementById("addStudent").addEventListener("click",addStudent);

$(document).keydown(function(e){
  if(e.which === 123){
     return false;
  }
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
  
      var user = firebase.auth().currentUser;
      if(user != null){
        collegeId = user.uid ;
        db.collection("college")
        .where("college_id","==",user.uid)
        .get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
                collegeName = doc.data()["college_name"];
                collegeCode = doc.data()["college_code"];
                collegeAmount = doc.data()["amount"];
                collegeDocId = doc.id;
            });
            if(collegeName == ""){
              window.location="index.html";
            }else{
            setCollegeName();
            showIt();
            getStudent();
            }
        });
      }
  
    } else {
        window.location="index.html";
    }
  });

  function setCollegeName(){
      document.getElementById("college").value = collegeName;
      document.getElementById("title_college").innerHTML = collegeName;
      document.getElementById("amount").innerHTML = "AMOUNT TO BE PAID: Rs." + collegeAmount ; 
  }

  function addStudent(){
    loadIt();
      var email = document.getElementById("email").value.trim()  ;
      var name = document.getElementById("name").value.trim() ;
      var contact = document.getElementById("contact").value.trim() ;
      var conf_email = document.getElementById("conf_email").value.trim() ;
      var check = document.getElementById("checked").checked;

      if(name == ""){
        showIt();
          window.alert("Please enter student's name") ;
          return;
      }

      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if(format.test(name)){
        showIt();
        window.alert("Please enter student's name with out any special character") ;
        return;
      }

      if(contact.length != 10){
        showIt();
          window.alert("Enter a valid contact number");
          return;
      }

      if(!ValidateEmail(email)){
        showIt();
          window.alert("Enter a valid email id");
          return;
      }

      if(email.localeCompare(conf_email) != 0){
        showIt();
          window.alert("Email doesn't match");
          return;
      }

      if(!check){
        showIt();
        window.alert("Please agree to terms and conditions");
        return;
      }

      var sid = r();
      var count = 0;

      db.collection("student")
      .where("college_id","==",collegeId)
      .where("email","==",email)
      .get().then((snapshot)=>{
          snapshot.docs.forEach(doc=>{
              count++;
          });

          if(count == 0){
              db.collection("student")
              .add({
                  college_id : collegeId,
                  college_name : collegeName,
                  name : name,
                  email : email,
                  contact : contact,
                  sid : sid
              }).then((data="0")=>{
                  resetTheForm();
                  collegeAmount += 200;
                  db.collection("college").doc(collegeDocId).update({
                      amount : collegeAmount
                  }).then((data = "0")=>{
                      setCollegeName();
                      sendMail(name, email, sid);
                      showIt();
                      window.alert("Student has been added successfully. Ask student to check email for SID.");
                      getStudent();
                  });
                  
              });
          }else{
              resetTheForm();
              showIt();
              window.alert("Student already exist.");
          }
      });

  }

  function resetTheForm(){
    document.getElementById("email").value = "";
    document.getElementById("name").value = "" ;
    document.getElementById("contact").value = "" ;
    document.getElementById("conf_email").value = "";
    document.getElementById("checked").checked = false ;
  }

  function getStudent(){
    loadIt();
      var table = "<table id='example'><thead><tr><th>NAME</th><th>E - MAIL</th><th>PHONE</th></tr></thead><tbody id='table'>";
      var count = 0 ; 
      db.collection("student")
      .where("college_id","==",collegeId)
      .get().then((snapshot)=>{
          snapshot.docs.forEach(doc=>{
              count++;
            table += "<tr><td>"+ doc.data()["name"] + "</td><td>" + doc.data()["email"] + "</td><td>" + doc.data()["contact"] + "</td></tr>";
          })
          table += "<tr style='display:none'><td></td><td>-"+ collegeName +"-</td><td></td></tr></tbody></table>";
          document.getElementById("tableHere").innerHTML = table;
          collegeAmount = count *200 ; 
          setCollegeName();
          showIt();
      });
  }

function gsid(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
 }

function r(){
        var a = gsid(6, '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ');
        var cn = collegeCode;
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
    var theurl='https://script.google.com/macros/s/AKfycbwfnGJB0vq77wxLmAuzBkHx-LzaJXh255w2pPGfFfW1-hM2VC1u/exec?name=' + name +"&email=" +email+ "&student_sid="+sid;
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



function logout(){
    firebase.auth().signOut();
 }