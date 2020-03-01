  
var eventName = "";
var numberOfPar = "";
var addbutton = document.getElementById("cnf1");
   
function main(){
        document.getElementById("sub").disabled = false;
        showMember(0,"");
        document.getElementById("sub").selectedIndex="0";
        addbutton.style.display = "none";
    
        var d = document.getElementById("main").value;
        if (d=="TECHNICAL"){
            
            document.getElementById("o1").style.display="inline";
            document.getElementById("o2").style.display="inline";
            document.getElementById("o3").style.display="inline";
            document.getElementById("o4").style.display="inline";
            document.getElementById("o5").style.display="inline";
            document.getElementById("o6").style.display="inline";
            document.getElementById("o7").style.display="inline";
            document.getElementById("o8").style.display="inline";
            document.getElementById("o9").style.display="inline";
            document.getElementById("o10").style.display="inline";
            document.getElementById("o11").style.display="inline";
            document.getElementById("o12").style.display="inline";
            document.getElementById("o13").style.display="inline";
            document.getElementById("o14").style.display="inline";
            document.getElementById("o15").style.display="inline";
            document.getElementById("o1").innerHTML="Grandmaster";
            document.getElementById("o2").innerHTML="Ease of Flow"; //yeh wala use kiya hai 12 wale me dusra koi 3 member wala dalna hai
            document.getElementById("o3").innerHTML="Design O'Web";
            document.getElementById("o4").innerHTML="Bot Soccer";
            document.getElementById("o5").innerHTML="Ace the Maze";
            document.getElementById("o6").innerHTML="RC Extreme";
            document.getElementById("o7").innerHTML="Flight Mode";
            document.getElementById("o8").style.display="none";
            document.getElementById("o9").innerHTML="App_Ninja";
            document.getElementById("o10").innerHTML="Science Exhibition";
            document.getElementById("o11").innerHTML="Carnage";
            document.getElementById("o12").innerHTML="Hydro Cannon";
            document.getElementById("o13").innerHTML="Tug of Bots";
            document.getElementById("o14").innerHTML="Runtime Terror";
            document.getElementById("o15").innerHTML="Survival";
             document.getElementById("o16").style.display="none";
             document.getElementById("o17").style.display="none";
             document.getElementById("o18").style.display="none";
            document.getElementById("o19").style.display="none";
             document.getElementById("o20").style.display="none";
            document.getElementById("o21").style.display="none";
            
        }
        else if (d=="NON-TECHNICAL"){
            document.getElementById("o1").style.display="inline";
            document.getElementById("o2").style.display="inline";
            document.getElementById("o3").style.display="inline";
            document.getElementById("o4").style.display="inline";
            document.getElementById("o5").style.display="inline";
            document.getElementById("o6").style.display="inline";
            document.getElementById("o7").style.display="inline";
            document.getElementById("o8").style.display="inline";
            document.getElementById("o9").style.display="inline";
            document.getElementById("o10").style.display="inline";
            document.getElementById("o11").style.display="inline";
            document.getElementById("o12").style.display="inline";
            document.getElementById("o13").style.display="inline";
            document.getElementById("o14").style.display="inline";
            document.getElementById("o15").style.display="inline";
            document.getElementById("o16").style.display="inline";
            document.getElementById("o17").style.display="inline";
            document.getElementById("o18").style.display="inline";
            document.getElementById("o19").style.display="inline";
            document.getElementById("o20").style.display="inline";
            document.getElementById("o21").style.display="inline";
            document.getElementById("o1").innerHTML="Call of Duty : Mobile";//
            document.getElementById("o2").innerHTML="PUBG : Mobile";//
            document.getElementById("o3").innerHTML="COUNTER STRIKE - Source";//
            document.getElementById("o4").innerHTML="FUNKAAR - Stand Up Comedy";//
            document.getElementById("o5").innerHTML="Poetry";//
            document.getElementById("o6").innerHTML="Khoj";//
            document.getElementById("o7").innerHTML="InQUIZition";//
            document.getElementById("o8").innerHTML="JAM";//
            document.getElementById("o9").innerHTML="Lensation";//
            document.getElementById("o10").innerHTML="Street Talk";//
            document.getElementById("o11").innerHTML="Celluloid";//
            document.getElementById("o12").innerHTML="STHIRA (The Jinga Game)";//
            document.getElementById("o13").innerHTML="Doodle - It";
            document.getElementById("o14").innerHTML="Mad Ads";//
            document.getElementById("o15").innerHTML="Sketch-It";//
            document.getElementById("o16").innerHTML="MIME";//
            document.getElementById("o17").innerHTML="Naqaab";//
             document.getElementById("o18").innerHTML="Paper Vogue";//
             document.getElementById("o19").innerHTML="Limelight";//
            document.getElementById("o20").innerHTML="Reflection";//
             document.getElementById("o21").innerHTML="Debate";//
            
        }
        else  {
            
            document.getElementById("o1").innerHTML="Game of Tones";
            document.getElementById("o2").innerHTML="Saptha Dhwani";
            document.getElementById("o3").innerHTML="Nrutya";
            document.getElementById("o4").innerHTML="Groove - Solo Dance Battle";
            document.getElementById("o5").innerHTML="Instrumental Jugalbandi";
            document.getElementById("o6").innerHTML="Tremor";
            document.getElementById("o7").style.display="none";
            document.getElementById("o8").style.display="none";
            document.getElementById("o9").style.display="none";
            document.getElementById("o10").style.display="none";
            document.getElementById("o11").style.display="none";
            document.getElementById("o12").style.display="none";
            document.getElementById("o13").style.display="none";
            document.getElementById("o14").style.display="none";
            document.getElementById("o15").style.display="none";
            document.getElementById("o16").style.display="none";
            document.getElementById("o17").style.display="none";
            document.getElementById("o18").style.display="none";
            document.getElementById("o19").style.display="none";
            document.getElementById("o20").style.display="none";
            document.getElementById("o21").style.display="none";   
        }
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("cnf").style.visibility="visible";
    }

    function registrationClosed(disp){
        document.getElementById("regClosed").style.display = disp ; 
    }

    function showMember(number, eName){
        for(var i=1; i<=number; i++){
            document.getElementById("m"+i).style.display="inline";
            document.getElementById("sid"+i).value="";
            document.getElementById("nsid"+i).innerHTML = ""; 
            document.getElementById("esid"+i).innerHTML = "";
            document.getElementById("sid"+i).readOnly= false;
        }

        for(var i=number+1;i<=15;i++){
            document.getElementById("m"+i).style.display="none";
            document.getElementById("sid"+i).value="";
            document.getElementById("nsid"+i).innerHTML = ""; 
            document.getElementById("esid"+i).innerHTML = "";
            document.getElementById("sid"+i).readOnly= false;
        }

        eventName = eName;
        numberOfPar = number;
        document.getElementById("team").readOnly = false;
        document.getElementById("team").value = "";
        registrationClosed("none");
    }
var glub=0;
function sub(){
    var a = document.getElementById("sub").value;
    
    if(a=="Groove - Solo Dance Battle" || a=="JAM"|| a=="Limelight" ||a=="Paper Vogue" || a=="FUNKAAR - Stand Up Comedy" || a=="Poetry"  ||a=="Doodle - It" || a=="Sketch-It" || a=="Grandmaster" || a=="Survival of the Fittest" ){
        showMember(1,a);
        addbutton.style.display="none";
    }
    else if(a=="STHIRA (The Jinga Game)" || a=="Survival"  || a == "Runtime Terror" || a=="App_Ninja" || a=="Naqaab" || a=="Debate"){
        showMember(2,a);
        addbutton.style.display="none";
    }
     else if(a=="Ease of Flow"){
        showMember(3,a);
        addbutton.style.display="none";
    }
    else if(a=="PUBG : Mobile" || a=="Khoj"  || a=="Science Exhibition" ){
        showMember(4,a);
        addbutton.style.display="none";
    }
    else if(a=="Call of Duty : Mobile" ||a== "COUNTER STRIKE - Source" ){
        showMember(5,a);
        addbutton.style.display="none";
    }
    else if(a=="Reflection" || a=="InQUIZition"  || a=="Lensation" || a=="Design O'Web" || a=="Instrumental Jugalbandi" || a=="Street Talk"){
        showMember(1,a);
        addbutton.style.display="inline";
    }
    else if(a=="Flight Mode" || a== "Bot Soccer"  || a=="Ace the Maze" || a=="Hydro Cannon"  || a=="RC Extreme" ||  a=="Tug of Bots"){
        showMember(2,a);
        addbutton.style.display="inline";
    }
    else if(a=="Carnage" || a=="Saptha Dhwani"){
        showMember(3,a);
        addbutton.style.display="inline";
    }
    else if(a=="Celluloid" || a=="Game of Tones"){
        showMember(4,a);
        addbutton.style.display="inline";
    }
    else if(a=="Mad Ads"){
        showMember(5,a);
        addbutton.style.display="inline";
    }
    else if( a=="Eastern Singing" || a=="Eastern Dance" || a=="MIME" ){
        showMember(6,a);
        addbutton.style.display="inline";
    }
    else if( a=="Tremor" || a=="Nrutya" ){
        showMember(7,a);
        addbutton.style.display="inline";
    }else if(a=="N.A."){ 
        showMember(0,a);
        addbutton.style.display="none";
        registrationClosed("inline");
    }
    document.getElementById("add").style.visibility="hidden";
    document.getElementById("cnf").style.visibility="visible";
}


function addm(){
    if(document.getElementById("m1").style.display!="inline"){
        showMember(1,eventName);
    }
    else if(document.getElementById("m2").style.display!="inline"){
        document.getElementById("m2").style.display="inline";
        if(eventName =="Design O'Web" || eventName=="Lensation" || eventName =="Reflection"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m3").style.display!="inline"){
        document.getElementById("m3").style.display="inline";
        if( eventName == "Instrumental Jugalbandi" || eventName=="Street Talk" || eventName=="InQUIZition" ){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m4").style.display!="inline"){
        document.getElementById("m4").style.display="inline";
        if(eventName=="Flight Mode" || eventName == "Bot Soccer" || eventName=="Ace the Maze"  ||eventName=="RC Extreme" ||  eventName=="Tug of Bots"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m5").style.display!="inline"){
        document.getElementById("m5").style.display="inline";
        if(eventName=="Hydro Cannon"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m6").style.display!="inline"){
        document.getElementById("m6").style.display="inline";
        if(eventName=="Carnage" ){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m7").style.display!="inline"){
        document.getElementById("m7").style.display="inline";
        if( eventName=="Saptha Dhwani"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m8").style.display!="inline"){
        document.getElementById("m8").style.display="inline";
        if( eventName=="Celluloid" || eventName=="MIME"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m9").style.display!="inline"){
        document.getElementById("m9").style.display="inline";
    }
    else if(document.getElementById("m10").style.display!="inline"){
        document.getElementById("m10").style.display="inline";
        if(eventName == "Mad Ads"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m11").style.display!="inline"){
        document.getElementById("m11").style.display="inline";
    }
    else if(document.getElementById("m12").style.display!="inline"){
        document.getElementById("m12").style.display="inline";
        if(eventName == "Game of Tones"){
            addbutton.style.display="none";
        }
    }
    else if(document.getElementById("m13").style.display!="inline"){
        document.getElementById("m13").style.display="inline";
    }
    else if(document.getElementById("m14").style.display!="inline"){
        document.getElementById("m14").style.display="inline";
    }
    else if(document.getElementById("m15").style.display!="inline"){
        document.getElementById("m15").style.display="inline";
        if(eventName == "Tremor" || eventName == "Nrutya"){
            addbutton.style.display="none";
        }
    }
    numberOfPar ++;
}

//input type id starts from (sid1) to (sid12)
//name id starts from (nsid1) to (nsid12)
//email id starts from (esid1) to (esid12)