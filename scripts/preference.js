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
            var prefGender = userDoc.data().prefGender;
  
            if (prefAge != null) {
              document.getElementById("prefAge").value = prefAge;
            }
            if (userLocation != null) {
              document.getElementById("prefLocation").value = prefLocation;
            }
            if (prefGender != null) {
              if (prefGender == "Female") {
                $('.Female').prop('checked', true);
              }
              if (userGender == "Male") {
                $('.Male').prop('checked', true);
              }
              if (userGender == "Non-binary") {
                $('.nonBinary').prop('checked', true);
              }
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
    prefGender = document.querySelector('input[name="Gender"]:checked').value;
  
    currentUser.update({
        prefAge: prefAge,
        prefLocation: prefLocation,
        prefGender: prefGender
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.assign("main.html");
      })
  }
  document.getElementById('preferenceFields').disabled = true;