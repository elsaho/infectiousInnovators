function topNavigation(){
    const home = document.getElementById("profile");
  
    function goProfile(){
      window.location.href = "/html/profile.html";
    }
    home.addEventListener("click", goProfile);
  }
  
  topNavigation();