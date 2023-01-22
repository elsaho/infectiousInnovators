function topNavigation(){
    const home = document.getElementById("profile");
    const main = document.getElementById("title");

    function goMain(){
      window.location.href = "/html/main.html";
    }
    main.addEventListener("click", goMain);
  
    function goProfile(){
      window.location.href = "/html/settings.html";
    }
    home.addEventListener("click", goProfile);
  }
  
  topNavigation();