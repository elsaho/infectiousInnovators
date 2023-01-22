function navigation(){
  const home = document.getElementById("home");
  const chats = document.getElementById("chats");

  function goHome(){
    window.location.href = "/html/main.html";
  }
  home.addEventListener("click", goHome);

  function goChats(){
    window.location.href = "/html/chats.html";
  }
  chats.addEventListener("click", goChats);
}

navigation();