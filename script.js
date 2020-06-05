let arrItems=[];
var flag=-1;

function openPage(pageName,elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "#444";
  }
  
  
$.getJSON("json-data.json", function (data) {
        data=JSON.stringify(data);
        arrItems=JSON.parse(data);
            for(var i=0;i<arrItems.length;i++){
                setImage(arrItems[i],i);
            }
        document.getElementById("addButton").innerHTML=`
        <button class="btn btn-primary col-2" onclick="openForm('add')">Add Image</button>`
            
    });

    function openForm(set){
        document.getElementById("addButton").style.display="none";
        document.getElementById("reset").click();
        document.getElementById("showData").style.display='none';
        document.getElementById("imageForm").style.display='block';
        if(set==="add"){
            flag=-1;
        }
        else{
            flag=0;
        }
        document.getElementById("imageForm").addEventListener("submit",saveData);
    }

    function saveData(e){
        e.preventDefault();
        if(validateName == false || validateDate == false || validateUrl == false){
            return ;
        }
        var object = {};
        let myForm=document.getElementById("imageForm");
        var formData=new FormData(myForm);
        formData.forEach(function(value, key){
            object[key] = value;
        });
        let index=arrItems.length;
        let i=parseInt(document.getElementById("id").value);
        let json = JSON.stringify(object);
        json = JSON.parse(json);
        if(flag==-1){
            arrItems.push(json);
            setImage(arrItems[index],index);
        }
        else{
            arrItems[i]=json;
            document.getElementById(i).children[0].src=arrItems[i].Image;
            document.getElementById(i).children[1].innerHTML="ID : "+i;
            document.getElementById(i).children[2].innerHTML="Name : "+arrItems[i].Name;
            document.getElementById(i).children[3].innerHTML="Information : "+arrItems[i].Information;
            document.getElementById(i).children[4].innerHTML="Uploaded Date : "+arrItems[i].Upload;
        }
        document.getElementById("addButton").style.display="block";
        document.getElementById("showData").style.display='grid';
        document.getElementById("imageForm").style.display='none';
    };

    function setImage(values,index){
        values.id=index;
        document.getElementById("showData").innerHTML+= `
        <div id="${index}" class="imagebox" style="max-width:555;">
        <img src=${values.Image}>
        <p id="id" style="display:none;">ID : ${values.id}</p>
        <p style="color: gray;">Name : ${values.Name}</p>
        <p style="color: gray;">Information : ${values.Information}</p>
        <p style="color: gray;">Uploaded Date : ${values.Upload}</p>
        <button class="btn btn-primary col-3" onclick="editImage(${index})">Edit</button>
        <button class="btn btn-danger col-3" onclick="deleteImage(${index})">Delete</button>
        </div>
        `
    }

    function deleteImage(id){
        var delImage=document.getElementById(id);
        delImage.parentElement.removeChild(delImage);
    }

    function editImage(id){
        document.getElementById("id").value=id;
        openForm("edit");
    }
    var validateDate;
    var validateName;
    var validateUrl;
    function validateImageForm(){
        var name=document.getElementById("Name").value;
        var nameFormat = /^[a-zA-Z0-9]*$/;
        if(!nameFormat.test(name)){
            alert("Enter a valid Name");
            document.imageForm.Name.value="";
            document.imageForm.Name.focus();
            validateName=false;
        }
        else{
            validateName=true;
        }
        var date=document.getElementById("Upload").value;
        currentDate=new Date(date);
        if(currentDate>(new Date).getTime())
        {
            alert("Enter a valid Date");
            validateDate=false;
        }
        else{
            validateDate=true;
        }
        var url=document.getElementById("Image").value;
        var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if(!pattern.test(url)){
            alert("Enter a valid Image Source");
            document.imageForm.Image.value="";
            document.imageForm.Image.focus();
            validateUrl=false;
        }
        else{
            validateUrl=true;
        }
    }

    function validateContactForm(){
        var email=document.contactForm.email.value;  
        var atposition=email.indexOf("@");  
        var dotposition=email.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
          alert("Please enter a valid e-mail address");  
          return false;  
          }  
        var mobile=document.contactForm.mobile.value;
        if(mobile.length<10 || mobile.length>14 || isNaN(mobile)){
          alert("Please enter a valid Mobile Number");
          return false; 
          }
      }
