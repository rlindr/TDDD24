//displayView = function(){
//   
//};
//
//
//document.onload = function(){
//    //code that is executed as the page is loaded.
//};


function loadView(){
	document.getElementById("welcomeView").innerHTML = document.getElementById("welcomeBody").innerHTML;
	
}




function checksignin(){

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

              alert("fungerar"); //Här ska vi signa upp sen      

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
      document.getElementById("r").innerHTML = result.message;


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






