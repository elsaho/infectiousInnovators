function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        window.location.href = "../index.html";
      }).catch((error) => {
      });
  }