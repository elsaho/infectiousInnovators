var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
  
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid);
  
        currentUser.get()
          .then(userDoc => {
            var minAge = userDoc.data().minAge;
            var maxAge = userDoc.data().maxAge;
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

            //Gender??? below?
            //Gender preference field created in Firestore
            currentUser.set({
              genderPref: firebase.firestore.FieldValue.arrayUnion(),
            }, {
              merge: true
            })

            // var genderPref = userDoc.data().genderPref;

            if (document.getElementById('prefMale').checked = true) {
                currentUser
                .set({
                  genderPref: firebase.firestore.FieldValue.arrayUnion("male"),
                }, {
                  merge: true
                })
            } else {
              currentUser
              .update({
                genderPref: firebase.firestore.FieldValue.arrayRemove("male"),
              })
              .then(function () {
                document.getElementById("prefMale").checked = false;
                console.log("Male preference is removed");
              });
            }

            if (document.getElementById('prefFemale').checked = true) {
              currentUser
              .set({
                genderPref: firebase.firestore.FieldValue.arrayUnion("female"),
              }, {
                merge: true
              })
            } else {
              currentUser.update({
                genderPref: firebase.firestore.FieldValue.arrayRemove("female")
              });
            }

            if (document.getElementById('prefNonBinary').checked = true) {
              currentUser
              .set({
                genderPref: firebase.firestore.FieldValue.arrayUnion("nonbinary"),
              }, {
                merge: true
              })
            } else {
              currentUser.update({
                genderPref: firebase.firestore.FieldValue.arrayRemove("nonbinary")
              });
            }

            

            // function addToGenderPref(p) {
            //   currentUser.get().then((userDoc) => {
            //     pref = userDoc.data().genderPref;
    
            //     if (pref.includes(p)) {
            //       currentUser
            //         .set({
            //           genderPref: firebase.firestore.FieldValue.arrayUnion(p),
            //         });
            //     } else {
            //       currentUser
            //         .update({
            //           genderPref: firebase.firestore.FieldValue.arrayUnion(p),
            //         }, {
            //           merge: true
            //         });
            //     }
            //   });
            
            // }



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
    minAge = document.getElementById('minAge').value; 
    maxAge = document.getElementById('maxAge').value; 
    prefLocation = document.getElementById('prefLocation').value;
    // prefMale = document.querySelector('input[name="prefGender"]:checked').value;
    // prefFemale = document.querySelector('input[name="prefGender"]:checked').value;
    // prefNonBinary = document.querySelector('input[name="prefGender"]:checked').value;
    // prefMale = document.getElementById('prefMale').value;
    // prefFemale = document.getElementById('prefFemale').value;
    // prefNonBinary = document.getElementById('prefNonBinary').value;
  
    currentUser.update({
        minAge: minAge,
        maxAge: maxAge,
        prefLocation: prefLocation,
        // genderPref: genderPref
        // prefMale: prefMale,
        // prefFemale: prefFemale,
        // prefNonBinary: prefNonBinary
      })
      .then(() => {
        console.log("Document successfully updated!");
        // window.location.assign("main.html");
      })
  }
  document.getElementById('preferenceFields').disabled = true;