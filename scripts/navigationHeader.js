function topNavigation(){
    const home = document.getElementById("profile");
  
    function goProfile(){
      window.location.href = "/html/settings.html";
    }
    home.addEventListener("click", goProfile);
  }
  
  topNavigation();