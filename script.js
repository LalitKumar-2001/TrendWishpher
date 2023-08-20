function signInWithGoogle() {
    var provider = new google.auth.GoogleAuthProvider();
    var auth2 = new google.auth.Auth2();
  
    auth2.signIn(provider).then(function(credentials) {
      // The user is signed in.
    });
  }
  