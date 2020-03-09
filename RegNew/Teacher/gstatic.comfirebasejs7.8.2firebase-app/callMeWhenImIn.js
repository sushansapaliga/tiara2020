
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
              window.location="login.html";
            }else{
            setCollegeName();
            showIt();
            getStudent();
            }
        });
      }
  
    } else {
        window.location="login.html";
    }
  });

  function setCollegeName(){
      document.getElementById("title_college").innerHTML = collegeName;
      document.getElementById("amount").innerHTML = "AMOUNT TO BE PAID: Rs." + collegeAmount ; 
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

function logout(){
    firebase.auth().signOut();
 }