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
        if( document.getElementById("email").value == "" || document.getElementById("password").value == "") {
          if(document.getElementById("email").value == "") {
           document.getElementById("email").style.borderColor = "red";
           error == "error";
          }
          
          if(document.getElementById("password").value == "") {
            document.getElementById("password").style.borderColor = "red";
            error == "error";
          }

          }
        else{

              alert("fungerar"); //Här ska vi signa upp sen

        }


}
function checksign(){

        var error2 =""

        if(document.getElementById("firstname").value == "" || document.getElementById("familyname").value == "" ||  document.getElementById("city").value == "" || document.getElementById("country").value == "" ||  document.getElementById("mail").value == "" || document.getElementById("psw").value == "" || document.getElementById("repeatpsw").value == "" || (document.getElementById("psw").value != document.getElementById("repeatpsw").value)) {
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

        if(document.getElementById("mail").value == "") {
         document.getElementById("mail").style.borderColor = "red";
               error2 = "error";
        }
        
        if(document.getElementById("psw").value == "") {
         document.getElementById("psw").style.borderColor = "red";
               error2 = "error";
        }
        
        if(document.getElementById("repeatpsw").value == "") {
         document.getElementById("repeatpsw").style.borderColor = "red";
               error2 = "error";
        }

        if(document.getElementById("psw").value != document.getElementById("repeatpsw").value ) {
          document.getElementById("repeatpsw").style.borderColor = "red";
           document.getElementById("psw").style.borderColor = "red";
               error2 = "error";
        }

    }
    else
    {
      alert("funkar1"); //Här signar vi upp igen
    }
  }

