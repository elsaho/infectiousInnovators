function edit(){
  const prof = document.getElementById("profile");
  const pref = document.getElementById("pref");


  function editProfile(){
    window.location.href = "/html/profile.html";
  }
  prof.addEventListener("click", editProfile);

  function editPref(){
    window.location.href = "/html/preference.html";
  }
  pref.addEventListener("click", editPref);
}

edit();

function logout() {
  console.log("logging out user");
  firebase.auth().signOut().then(() => {
      window.location.href = "../index.html";
    }).catch((error) => {
    });
}