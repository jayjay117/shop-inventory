// Shared JavaScript for validation
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Validate username and password
    if (usernameInput !== "GrouponeDb333" || passwordInput !== "grp1SE300db") {
        errorMessage.textContent = "Invalid username or password.";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        alert("Sign-Up Successful!");
        window.location.href = "login.html"; // Redirect to the login page
    }
});
