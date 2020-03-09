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
    .get().then((snapShot)=>{
        snapShot.docs.forEach(doc=>{
            console.log(doc.data()["college_name"]);
            collegeList = collegeList + "<option id='o"+ i +"'>"+ doc.data()["college_name"] +"</option>";
            i++;
        });
        document.getElementById("collegeList").innerHTML = collegeList ;
        showIt();
    });
}

onLoad();