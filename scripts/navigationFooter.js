function navigation(){
  const home = document.getElementById("home");
  const matches = document.getElementById("matches");
  const chats = document.getElementById("chats");

  function goHome(){
    window.location.href = "/html/main.html";
  }
  home.addEventListener("click", goHome);

  function goMatches(){
    window.location.href = "/html/matches.html";
  }
  matches.addEventListener("click", goMatches);

  function goChats(){
    window.location.href = "/html/chats.html";
  }
  chats.addEventListener("click", goChats);
}

navigation();