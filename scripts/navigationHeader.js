function topNavigation(){
    const home = document.getElementById("profile");

    function goMain(){
      window.location.href = "/html/main.html";
    }
    home.addEventListener("click", goMain);
  
    function goProfile(){
      window.location.href = "/html/settings.html";
    }
    home.addEventListener("click", goProfile);
  }
  
  topNavigation();