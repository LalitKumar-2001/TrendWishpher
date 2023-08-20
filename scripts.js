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
