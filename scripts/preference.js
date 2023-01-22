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
            // var prefFemale = userDoc.data().prefFemale;
            // var prefMale = userDoc.data().prefMale;
            // var prefNonBinary = userDoc.data().prefNonBinary;
            // var genderPref = userDoc.data().genderPref;
  
            if (prefAge != null) {
              document.getElementById("prefAge").value = prefAge;
            }
            if (prefLocation != null) {
              document.getElementById("prefLocation").value = prefLocation;
            }

          //   var genderKeys = ["prefMale", "prefFemale", "prefNonBinary"];
          //   var genderVals = [null, null, null];
          //   var genderObj = {};

          //   for(var i = 0; i < genderKeys.length; i++){
          //     if (document.getElementById(genderKeys[i]).checked = true) {
          //       genderVals[i] = true;
          //       genderObj[genderKeys[i]] = genderVals[i];
          //     } else {
          //       genderVals[i] = false;
          //       genderObj[genderKeys[i]] = genderVals[i];
          //     }
          // }

            // const btn = document.querySelector('#btn');
            //     btn.addEventListener('click', (event) => {
            //         let checkboxes = document.querySelectorAll('input[id="prefMale"]:checked');
            //         checkboxes.forEach((checkbox) => {
            //         genders.push(checkbox.value);
            // });
            // });

        
            // Below doesn't work
            // if (document.getElementById('prefMale').checked = true) {
            //     document.getElementById("prefMale").value = true;
            //     $('.prefMale').prop('checked', true);
            //     document.querySelectorAll('input[id="prefMale"]:checked');
            // } else {
            //     document.getElementById("prefMale").value = false;
            //     document.getElementById("prefMale").checked = false;
            //     $('.prefMale').prop('checked', false);
            // }

            // if (document.getElementById('prefFemale').checked = true) {
            //     document.getElementById("prefFemale").value = true;
            //     $('.prefFemale').prop('checked', true);
            // } else {
            //     document.getElementById("prefFemale").value = false;
            //     document.getElementById("prefFemale").checked = false;
            //     $('.prefFemale').prop('checked', false);
            // }

            // if (document.getElementById('prefNonBinary').checked = true) {
            //     document.getElementById("prefNonBinary").value = true;
            //     $('.prefNonBinary').prop('checked', true);
            // } else {
            //     document.getElementById("prefNonBinary").value = false;
            //     document.getElementById("prefNonBinary").checked = false;
            //     $('.prefNonBinary').prop('checked', false);
            // }
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
    prefMale = document.querySelector('input[name="prefGender"]:checked').value;
    prefFemale = document.querySelector('input[name="prefGender"]:checked').value;
    prefNonBinary = document.querySelector('input[name="prefGender"]:checked').value;
    // prefMale = document.getElementById('prefMale').value;
    // prefFemale = document.getElementById('prefFemale').value;
    // prefNonBinary = document.getElementById('prefNonBinary').value;
  
    currentUser.update({
        prefAge: prefAge,
        prefLocation: prefLocation,
        prefMale: prefMale,
        prefFemale: prefFemale,
        prefNonBinary: prefNonBinary
      })
      .then(() => {
        console.log("Document successfully updated!");
        // window.location.assign("main.html");
      })
  }
  document.getElementById('preferenceFields').disabled = true;