var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
  
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid);
  
        currentUser.get()
          .then(userDoc => {
            var prefAge = userDoc.data().prefAge;
            var prefLocation = userDoc.data().prefLocation;
            var prefFemale = userDoc.data().prefFemale;
            var prefMale = userDoc.data().prefMale;
            var prefNonBinary = userDoc.data().prefNonBinary;
  
            if (prefAge != null) {
              document.getElementById("prefAge").value = prefAge;
            }
            if (prefLocation != null) {
              document.getElementById("prefLocation").value = prefLocation;
            }

            if (document.getElementById('prefMale').checked) {
                document.getElementById("prefMale").value = true;
            } else {
                document.getElementById("prefMale").value = false;
            }

            if (document.getElementById('prefFemale').checked) {
                document.getElementById("prefFemale").value = true;
            } else {
                document.getElementById("prefFemale").value = false;
            }

            if (document.getElementById('prefNonBinary').checked) {
                document.getElementById("prefNonBinary").value = true;
            } else {
                document.getElementById("prefNonBinary").value = false;
            }
          })
      } else {
        console.log("No user is signed in");
      }
    });
  }
  
  populateInfo();
  
  function editUserPref() {
    document.getElementById('preferenceFields').disabled = false;
  }
  
  function saveUserPref() {  
    prefAge = document.getElementById('prefAge').value; 
    prefLocation = document.getElementById('prefLocation').value;
    prefMale = document.getElementById('prefMale').value;
    prefFemale = document.getElementById('prefFemale').value;
    prefNonBinary = document.getElementById('prefNonBinary').value;
  
    currentUser.update({
        prefAge: prefAge,
        prefLocation: prefLocation,
        prefMale: prefMale,
        prefFemale: prefFemale,
        prefNonBinary: prefNonBinary
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.assign("main.html");
      })
  }
  document.getElementById('preferenceFields').disabled = true;