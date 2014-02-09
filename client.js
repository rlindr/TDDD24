function loadView(){
  var x=3;
  
  if(x==1){
	document.getElementById("welcomeView").innerHTML = document.getElementById("welcomeBody").innerHTML;
	}
  
  if(x==2){document.getElementById("profileView").innerHTML = document.getElementById("profileBody").innerHTML;
  }
  
  if(x==3){document.getElementById("friendView").innerHTML = document.getElementById("friendBody").innerHTML;}
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

          var validid = serverstub.signIn(email1,password1);
          document.getElementById("in").innerHTML = validid.message;

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






