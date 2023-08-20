// JavaScript code to handle chat interactions will go here
// Function to extract URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  // Function to update user profile on the new page
  function updateUserProfile(user) {
    var profileImage = document.getElementById("profile-image");
    var userNameElement = document.getElementById("user-name");
  
    if (user) {
      profileImage.src = user.photoURL || "path/to/default-profile-image.png";
      userNameElement.textContent = user.displayName || "Guest";
    }
  }
  
  // Check for user information parameter on page load
  document.addEventListener("DOMContentLoaded", function() {
    var userInfo = getParameterByName("user");
    if (userInfo) {
      updateUserProfile(JSON.parse(userInfo));
    }
  });
  