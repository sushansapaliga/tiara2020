function getEvent(){
    var event = document.getElementById('event').value;
console.log(event); 
    
    if (event.trim() == ""){
        alert("Select One Event From Option");
    }
    else{
        
    
    var d = "<table id='example'><thead><th>Team Name</th><th>Player Name</th><th>Phone</th><th>College</th></thead>";
    var count = 0;
    db.collection('event').where('event_name','==',event).get().then((snapshot) =>{
        snapshot.docs.forEach(doc =>{  
            count++;
           d+="<tbody><tr><td>"+doc.data().team_name+"</td><td>"+doc.data().player_name+"</td><td>"+doc.data().player_phone+"</td><td>"+doc.data().college_name+"</td></tr></tbody>";
        });
        d+="</table>";
             document.getElementById('table').innerHTML = d;
        document.getElementById('nouse').innerHTML = "Total Team Count = "+count+"";
    });
   }
}

 
/*
db.collection('event').get().then((snapshot) =>{
        snapshot.docs.forEach(doc =>{
            renderteam(doc);
        });
    });*/


    /*    let li = document.createElement('li');
    let name = document.createElement('span');
    let phone = document.createElement('span');
    let ename = document.createElement('span');
    let cname = document.createElement('span');
    let tname = document.createElement('span');
    
    li.setAttribute('data-id',doc.id);
    tname.textContent = doc.data().team_name;
    name.textContent = doc.data().player_name;
    phone.textContent = doc.data().phone;
    ename.textContent = doc.data().event_name;
    cname.textContent = doc.data().college_name;
    
    li.appendChild(tname);
    li.appendChild(name);
    li.appendChild(phone);
    li.appendChild(ename);
    li.appendChild(cname);
    
    team.appendChild(li);*/