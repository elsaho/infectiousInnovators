function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
      }).catch((error) => {
      });
  }