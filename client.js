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
	var a=document.getElementById("sign-in")
for(var i = 0; i < a.length; i++) 
{
        if(!a[i].value) {
          a[i].style.backgroundColor = "#ff0000";
        }
        
        else {
          a[i].style.backgroundColor = "#fff";      
        }
      } 
    }

