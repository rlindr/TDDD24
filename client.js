

function loadView(viewid){

  
  if(viewid==undefined){
	document.getElementById("welcomeView").innerHTML = document.getElementById("welcomeBody").innerHTML;
	startview();
  }
  
  if(viewid!=undefined){document.getElementById("profileView").innerHTML = document.getElementById("profileBody").innerHTML;
  homeview();
  }
  
/*  if(viewid==3){document.getElementById("friendView").innerHTML = document.getElementById("friendBody").innerHTML;
  browseview();
  }*/
}


var logout = function(){
  var utloggad = serverstub.signOut(logedin); 
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
          document.getElementById("in").innerHTML = validid.message;
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

function popdata(){
  var user = serverstub.getUserDataByToken(localStorage.getItem("currentUser"));
  document.getElementById("fn").innerHTML = user.data.firstname;
  document.getElementById("fmn").innerHTML = user.data.familyname;
  document.getElementById("gender1").innerHTML = user.data.gender;
  document.getElementById("city1").innerHTML = user.data.city;
  document.getElementById("country1").innerHTML = user.data.country;
  document.getElementById("email2").innerHTML = user.data.email;

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

