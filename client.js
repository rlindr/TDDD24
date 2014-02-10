

function loadView(viewid){  
  
  document.getElementById("welcomeView").innerHTML = document.getElementById("welcomeBody").innerHTML;
  document.getElementById("profileView").innerHTML = document.getElementById("profileBody").innerHTML;
  document.getElementById("friendView").innerHTML = document.getElementById("friendBody").innerHTML;

  if(viewid==undefined){
	startview();
  }
  
  if(viewid!=undefined){
  homeview();
  }
  
  if(viewid==3){
  browseview();
  }
}


var changepassword = function(formData){

var check ={

          "oldPassword" : formData.oldPassword.value,
          "newPassword" : formData.newPassword.value,
          
          }

var result = serverstub.changePassword(localStorage.getItem("currentUser"), check.oldPassword, check.newPassword);
alert(result.message);

}

var logout = function(){
  var utloggad = serverstub.signOut(localStorage.getItem("currentUser")); 
    if(utloggad.message = "Successfully signed out."){
    localStorage.setItem("currentUser", undefined);
    loadView(undefined);
    }
    else{
      alert("Try to log out again");
    }
}


var checksignin = function(formData){  

          var userid ={

          "email1" : formData.email1.value,
          "password1" : formData.password1.value,
          
          }


        var error = ""
        if( document.getElementById("email1").value == "" || document.getElementById("password1").value == "") {
          if(document.getElementById("email1").value == "") {
           document.getElementById("email1").style.borderColor = "red";
           error == "error";
          }
          
          if(document.getElementById("password1").value == "") {
            document.getElementById("password1").style.borderColor = "red";
            error == "error";
          }

          }
        else{

          validid = serverstub.signIn(userid.email1,userid.password1);
          alert(document.getElementById("in").innerHTML = validid.message);
          localStorage.setItem("currentUser", validid.data);
          loadView(validid.data);

        }

       

}

var checksignup = function(formData){


         var user ={

          "email" : formData.email.value,
          "password" : formData.password.value,
          "firstname" : formData.firstname.value,
          "familyname" : formData.familyname.value,
          "gender" : formData.gender.value,
          "city" : formData.city.value,
          "country" : formData.country.value
          
          }

        var error2 =""

        if(document.getElementById("firstname").value == "" || document.getElementById("familyname").value == "" ||  document.getElementById("city").value == "" || document.getElementById("country").value == "" ||  document.getElementById("email").value == "" || document.getElementById("password").value == "" || document.getElementById("repeatpsw").value == "" || (document.getElementById("password").value != document.getElementById("repeatpsw").value)) {
        if(document.getElementById("firstname").value == "") {
         document.getElementById("firstname").style.borderColor = "red";
         error2 = "error";
        }
        
        if(document.getElementById("familyname").value == "") {
         document.getElementById("familyname").style.borderColor = "red";
        error2 = "error";
        }

        if(document.getElementById("city").value == "") {
         document.getElementById("city").style.borderColor = "red";
               error2 = "error";
        }
        
        if(document.getElementById("country").value == "") {
         document.getElementById("country").style.borderColor = "red";
               error2 = "error";
        }

        if(document.getElementById("email").value == "") {
         document.getElementById("email").style.borderColor = "red";
               error2 = "error";
        }
        
        if(document.getElementById("password").value == "") {
         document.getElementById("password").style.borderColor = "red";
               error2 = "error";
        }
        
        if(document.getElementById("repeatpsw").value == "") {
         document.getElementById("repeatpsw").style.borderColor = "red";
               error2 = "error";
        }

        if(document.getElementById("password").value != document.getElementById("repeatpsw").value ) {
          document.getElementById("repeatpsw").style.borderColor = "red";
           document.getElementById("password").style.borderColor = "red";
               error2 = "error";
        }

    }
    else
    {


      var result = serverstub.signUp(user);
      document.getElementById("up").innerHTML = result.message;


    }
  }

var reloadwall = function(){

var messages = serverstub.getUserMessagesByToken(localStorage.getItem("currentUser")).data;

document.getElementById("wall").innerHTML = "";

for (var i=0;i<messages.length;i++)
{

document.getElementById("wall").innerHTML += messages[i].content + "<br>";

}


}

var postmessage = function(formData){

  var content ={
    "post" : formData.post.value
  }  
  
  serverstub.postMessage(localStorage.getItem("currentUser"), content.post, serverstub.getUserDataByToken(localStorage.getItem("currentUser")).email);
  alert("posted a message!");

}


function popdata(){
  var user = serverstub.getUserDataByToken(localStorage.getItem("currentUser"));
  document.getElementById("fn").innerHTML = user.data.firstname;
  document.getElementById("fmn").innerHTML = user.data.familyname;
  document.getElementById("gender1").innerHTML = user.data.gender;
  document.getElementById("city1").innerHTML = user.data.city;
  document.getElementById("country1").innerHTML = user.data.country;
  document.getElementById("email2").innerHTML = user.data.email;

  //borde skrivas om för att användas vid sökning på användare också

}

function home()
{
  document.getElementById("home").className = "show";
  document.getElementById("browse").className = "hidden";
  document.getElementById("account").className = "hidden";
}

function browse()
{
  document.getElementById("home").className = "hidden";
  document.getElementById("browse").className =  "show";
  document.getElementById("account").className =  "hidden";
}

function account()
{
  document.getElementById("home").className = "hidden";
  document.getElementById("browse").className = "hidden";
  document.getElementById("account").className = "show";
}

function startview()
{
  document.getElementById("startview").className = "show";
  document.getElementById("homeview").className = "hidden";
  document.getElementById("browseview").className = "hidden";
}

function homeview()
{
  popdata();
  document.getElementById("startview").className = "hidden";
  document.getElementById("homeview").className =  "show";
  document.getElementById("browseview").className =  "hidden";

}

function browseview()
{
  document.getElementById("startview").className = "hidden";
  document.getElementById("homeview").className = "hidden";
  document.getElementById("browseview").className = "show";
}


window.onload = function() {
  loadView();
}

