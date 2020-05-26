
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

