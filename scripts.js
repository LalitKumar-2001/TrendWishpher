function onAuthenticationSuccess(user) {
  // Redirect the user to the new webpage
  window.location.href = "chat.html?user=" + encodeURIComponent(JSON.stringify(user));
}

// Function to authenticate with Google
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      var user = result.user;
      console.log("User signed in:", user);
      onAuthenticationSuccess(user); // Call this function with the user object
    })
    .catch(function(error) {
      console.error("Google sign-in error:", error);
    });
}

function showPopup() {
  var popup = document.getElementById("popup-notification");
  popup.style.display = "block";
  setTimeout(function() {
    popup.style.display = "none";
  }, 3000); // Hide after 3 seconds
}

function submitFeedback() {
  var feedbackInput = document.getElementById("feedback-input").value;
  if (feedbackInput.trim() !== "") {
    db.collection("feedback").add({
      text: feedbackInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      // Show popup after storing feedback
      showPopup();
    })
    .catch(function(error) {
      console.error("Error adding feedback: ", error);
    });
  }
}




// function showPopup() {
//   // ... Previous popup code ...
//   var popup = document.getElementById("popup-notification");
//   popup.style.display = "block";
//   setTimeout(function() {
//     popup.style.display = "none";
//   }, 3000);
//   // Store feedback in Firestore
//   var feedbackInput = document.getElementById("feedback-input").value;
//   if (feedbackInput.trim() !== "") {
//     db.collection("feedback").add({
//       text: feedbackInput,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })
//     .then(function() {
//       // Show popup after storing feedback
//       showPopup();
//     })
//     .catch(function(error) {
//       console.error("Error adding feedback: ", error);
//     });
//   }
// }