function loadIt(){
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("main-content").style.display = "none";
}

function showIt(){
    document.getElementById("loading-spinner").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}




const db = firebase.firestore();
 

$(document).keydown(function(e){
  if(e.which === 123){
     return false;
  }
});

  function getStudent(){
    //loadIt();
      var table = "<table id='example'><thead><tr><th>SID</th><th>Name</th><th>College</th><th>Phone</th><th>Attendance</th></tr></thead><tbody id='table'>";
      var count = 0 ; 
      db.collection("Attendance")
      .orderBy("college_name")
      .get().then((snapshot)=>{
          snapshot.docs.forEach(doc=>{
              count++;
            table += "<tr style='background-color:white;'><td>"+ doc.data()["sid"] + "</td><td>"+ doc.data()["name"] + "</td><td>" + doc.data()["college_name"] + "</td><td>" + doc.data()["contact"] + "</td><td>"+ doc.data()["attendance"] + "</td></tr>";
          })
          table += "</tbody></table>";
          document.getElementById("tableHere").innerHTML = table;
          collegeAmount = count *200 ; 
         document.getElementById("amount").innerHTML = "Amount Received : Rs. "+collegeAmount+".";
      });
  }

  function myStudent(){
    var a =  document.getElementById("search").value.trim();
    if (a==""){
      alert("Enter the SID first")
    }
    else{
    loadIt();
    var get_sid = document.getElementById("search").value.trim();

    var docRef = db.collection("student");

      docRef.where("sid" ,"==",get_sid).get().then(function(snapShot) {
        var i =0;
        var s="";var n="";var c="";var p="";var e="";
        snapShot.docs.forEach(doc=>{
          
          s =  doc.data()["sid"];
          n =  doc.data()["name"];
          c =  doc.data()["college_name"];
          p =  doc.data()["contact"];
         // e =  doc.data()["email"];
          i++;
        });
          if (i==1) {
            // var a =  doc.data()["attendance"];
   
             document.getElementById("sid_student").innerHTML = s;
             document.getElementById("name_student").innerHTML = n;
             document.getElementById("college_student").innerHTML = c;
             document.getElementById("phone_student").innerHTML = p;
            // document.getElementById("email_student").innerHTML = e;
           //  document.getElementById("attendance_student").innerHTML = a;
          showIt();

          } else {
              
              alert("No Record Found. Check SID again");
              showIt();
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);showIt();
      });
    }
  }
  
  function addStudent(){
    if (document.getElementById("attendance_student").value=="Choose here"){
      alert("Select Attendance Type");
    }
    else{
    loadIt();
      var sid_student = document.getElementById("sid_student").innerHTML;
      var name_student = document.getElementById("name_student").innerHTML;
      var college_student = document.getElementById("college_student").innerHTML;
      var phone_student = document.getElementById("phone_student").innerHTML;
     // var email_student = document.getElementById("email_student").innerHTML;
      var attendance_student = document.getElementById("attendance_student").value;
      var get_sid = document.getElementById("search").value.trim();
      
      var docRef = db.collection("Attendance");
  
        docRef.where("sid" ,"==",get_sid).get().then(function(snapShot){
          var i =0;
          
          snapShot.docs.forEach(doc=>{
            i++;
          });
          if (i != 0) {
            alert("Student Already Attended the Event!!");
            document.getElementById("sid_student").style.color='red';
            document.getElementById("name_student").style.color='red';
            document.getElementById("college_student").style.color='red';
            document.getElementById("phone_student").style.color='red';
          showIt();

          } else {
                      db.collection("Attendance").add({
                        sid : sid_student,
                        name : name_student,
                        college_name : college_student,
                        contact : phone_student,
                        attendance : attendance_student
                })
                .then(function() {
                  alert("Student Added. Kindly Collect the Fee and give the ID Card!");
                resetTheForm();
                getStudent()
                showIt();
                
                });
          }
        });

  }
}

function resetTheForm(){
    document.getElementById("sid_student").innerHTML="";
    document.getElementById("name_student").innerHTML="";
    document.getElementById("college_student").innerHTML="";
    document.getElementById("phone_student").innerHTML="";
    document.getElementById("attendance_student").value="Choose here";
    document.getElementById("search").value="";
}
    