const db = firebase.firestore();

var database = firebase.database();
var ref = database.ref("event");
var ref1 = database.ref("Registration");

var collectSID=[];
var colName="";
var colID = "";

var parName=[];
var parEmail=[];
var parPhone = [];
var teamName = "";

document.getElementById("add").addEventListener("click",addStudent);
document.getElementById("cnf").addEventListener("click",eventCheck);

$(document).keydown(function(e){
    if(e.which === 123){
       return false;                 
    }
});

function loadIt(){
    document.getElementById("loading-spinner").style.display = "block";
    document.getElementById("main-content").style.display = "none";
}

function showIt(){
    document.getElementById("loading-spinner").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}

function eventCheck(){
    loadIt();
    if (document.getElementById("main").selectedIndex=="0"){
        //confirm("Select Event Type");
        disp(0,"Select Event Type");
        showIt();
        return;
    }else if (document.getElementById("sub").selectedIndex=="0"){
        //confirm("Select an Event");
        disp(0,"Select an Event");
        showIt();
        return;
    }else{
        db.collection("closed")
        .where("event_name","==",eventName)
        .get().then((snapShot)=>{
            var count=0;
            snapShot.docs.forEach(doc=>{
                count++;
            });
            if(count != 0 ){
                showMember(0,eventName);
                addbutton.style.display="none";
                registrationClosed("inline");
                showIt();
            }else{
                show();
            }
        });
    }
}

function show(){
    loadIt();
    if (document.getElementById("team").value.trim() == "" ){
        //confirm("Enter Team Name");
        disp(0,"Enter Team Name.");
        showIt();
        return;
    }
    else if(document.getElementById("team").value.trim().length > 25){
        disp(0,"Team name is very long.");
        showIt();
        return;
    }
     else if ( checkStudentSIDIsValid() ){
        showIt();
        return;
    }
    else{
        collectSID=[];
        for(var i=1;i<=numberOfPar;i++){
            var lcsid = document.getElementById("sid"+i).value.trim();
            if(!collectSID.includes(lcsid)){
                collectSID.push(document.getElementById("sid"+i).value.trim());
            }else{
                //confirm(lcsid+" SID already exists");
                disp(0,lcsid+" SID already exists");
                showIt();
                return;
            }
        }

        colName="";
        colID = "";

        db.collection("student")
        .where("sid","==",collectSID[0])
        .get().then((snapShot)=>{
            var count=0;
            snapShot.docs.forEach(doc=>{
                colName = doc.data()["college_name"];
                colID = doc.data()["college_id"];
                count++;
            });
            if(count == 1){
                db.collection("student")
                .where("college_id","==",colID)
                .get().then((snapShot1)=>{
                    var nameArr=[];
                    var sidArr=[];
                    var phoneArr=[];
                    var emailArr= [];
                    snapShot1.docs.forEach(doc1=>{
                        nameArr.push(doc1.data()["name"]);
                        sidArr.push(doc1.data()["sid"]);
                        phoneArr.push(doc1.data()["contact"]);
                        emailArr.push(doc1.data()["email"]);
                    });
                    checkLoveIsProper(nameArr, sidArr, phoneArr, emailArr);
                }).catch((error)=>{
                    showIt();
                    //confirm("Error:"+ error);
                    disp(0,"Error:"+ error);
                });
            }else{
                //confirm(collectSID[0] + " is invalid or has not registered");
                disp(0,collectSID[0] + " is invalid or has not registered");
                showIt();
            }
        }).catch((error)=>{
            showIt();
            //confirm("Error:"+ error);
            disp(0,"Error:"+ error);
        });
    }
}

function checkLoveIsProper(nameArr, sidArr, phoneArr, emailArr){
    parEmail = [];
    parName = [];
    parPhone = [];
    for(var i=0; i<collectSID.length ; i++){
        var res = sidArr.indexOf(collectSID[i]);
        if( res == -1){
            //confirm(collectSID[i] + " is invalid or has not registered");
            disp(0,collectSID[i] + " is invalid or has not registered");
            return;
        }else{
            parPhone.push(phoneArr[res]);
            parName.push(nameArr[res]);
            parEmail.push(emailArr[res]);
        }
    }
    displayDetail();
}

function displayDetail(){
    for(var i =0 ; i< collectSID.length ; i++){
        i1 = i+1;
        document.getElementById("nsid"+i1).innerHTML = parName[i]; 
        document.getElementById("esid"+i1).innerHTML = parEmail[i];
        document.getElementById("sid"+i1).readOnly = true ; 
    }
    teamName = document.getElementById("team").value;
    document.getElementById("team").readOnly= true;
    document.getElementById("add").style.visibility="visible";
    document.getElementById("cnf").style.visibility="hidden";
    document.getElementById("cnf1").style.visibility="hidden";
    showIt();
}

function addStudent(){
    loadIt();
    //var k = confirm("Team details cannot be changed later.");
    var k= true;

    if(k==true){
        checkParExist();
    }else{
        showIt();
        return;
    }

}

function checkParExist(){
    db.collection("event")
    .where("college_id","==",colID)
    .where("event_name","==",eventName)
    .get().then((snapShot)=>{

        var allPar= [];

        snapShot.docs.forEach(doc=>{
            var parSID = doc.data()["player_sid"].split(",");
            for(var i=0 ; i< parSID.length ; i++){
                allPar.push(parSID[i]);
            }
        })

        for(var i =0; i< collectSID.length; i++){
            if(allPar.includes(collectSID[i])){
                //confirm(collectSID[i] + " has already registered for this event.");
                disp(0,collectSID[i] + " has already registered for this event.");
                showIt();
                return;
            }
        }
        addTeam();
    });
}

function addTeam(){
    var name= parName[0] ;
    var email= parEmail[0] ;
    var phone = parPhone[0] ;
    var csid = collectSID[0] ;

    for(var i=1;i<collectSID.length;i++){
        name += ", "+parName[i] ;
        email += ", "+parEmail[i] ;
        phone +=", "+parPhone[i] ;
        csid += ", "+collectSID[i] ;
    }

    db.collection("event")
    .add({
        college_id : colID,
        college_name: colName,
        event_name: eventName,
        player_phone: phone,
        player_name: name,
        player_sid: csid,
        player_email: email,
        team_name: teamName 
    }).then((data="0")=>{
        addToRealDataBase();
        //confirm("Successfully added team");
        disp(1,"Successfully added team");
        //window.location = "Event.html";
    }).catch((error)=>{
        showIt();
        //confirm("Error:"+ error);
        disp(0,"Error:"+ error)
    });
}

function addToRealDataBase(){

    ref = ref.child(eventName);
    var p = ref.push();
    var key = p.key;
    
    p.set({
        team_name: teamName,
        college_name: colName,
        college_id: colID
    });

    ref = ref.child(key+"/student_list");
    for(var i=0;i< collectSID.length;i++){
        ref.push().set({
            name: parName[i],
            email: parEmail[i],
            sid: collectSID[i]
        });
        ref1.child(collectSID[i]).push().set({
            event: eventName
        });
    }
}

function checkStudentSIDIsValid(){
    var collCode = "";
    for(var i=1; i<=numberOfPar ; i++){
        var studSid = document.getElementById("sid"+i).value.trim() ;
        if( studSid == "" ){
            //confirm("Enter SID of member "+i);
            disp(0,"Enter SID of member "+i)
            return true;
        }else if( studSid.split("-")[0].localeCompare(collCode) != 0 && i != 1 ){
            //confirm("Members are not from same college");
            disp(0,"Members are not from same college")
            return true;
        }else if(i==1){
            collCode =  studSid.split("-")[0];
        }
    }
    return false;
}