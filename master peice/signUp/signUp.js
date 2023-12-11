let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
}
function validateSignupForm() {
    var name = document.getElementById("name").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var ageCheckbox = document.getElementById("ageCheckbox").checked;
    var userRadio = document.getElementById("userRadio").checked;
    var renterRadio = document.getElementById("renterRadio").checked;
    var errorElement = document.getElementById("signupError");

    // Simple name validation
    if (!name || !name.match(/^[A-Za-z ]+$/)) {
        errorElement.textContent = "Invalid name";
        return;
    }

    // Simple phone number validation
    if (!phoneNumber || !phoneNumber.match(/^[0-9]+$/)) {
        errorElement.textContent = "Invalid phone number";
        return;
    }

    // Simple email validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorElement.textContent = "Invalid email address";
        return;
    }

    // Simple password length validation
    if (!password || password.length < 6 || password.length > 18) {
        errorElement.textContent = "Password must be between 6 and 18 characters";
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords do not match";
        return;
    }

    // Check if the age checkbox is checked
    if (!ageCheckbox) {
        errorElement.textContent = "You must be above 18 years old";
        return;
    }

    // Check if either user or renter radio button is selected
    if (!userRadio && !renterRadio) {
        errorElement.textContent = "Please select a user type";
        return;
    }
    
    // Clear any previous error messages
    errorElement.textContent = "";
    var usertype= document.querySelector('input[name="userType"]:checked').value;
    // Create the data object to be sent to the server
    var data = {
        name: name,
        email: email,
        phone: phoneNumber,
        password: password,
        role_id: usertype  // Assuming 2 for User and 3 for Renter
    };

    // Fetch API to post data to the server
    fetch('http://127.0.0.1:8000/api/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, /",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data received:", data);

        if (data.message === 'The email has already been taken.') {
            console.log("Email already taken. Display error message.");
            errorElement.textContent = data.message;
        } else {
            console.log("User signed up successfully. Redirecting based on role.");
            var roleId = data.user.role_id;
            var id = data.user.id;
            var name = data.user.name;

            // Save role id, user id, and isLoggedin in session storage
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('roleId', roleId);
            sessionStorage.setItem('userId', id);
            sessionStorage.setItem('isLoggedin', true);
             let rolee=roleId;
            // Redirect based on role id
            switch (rolee) {
                case "2":
                    console.log("Redirecting to Renter page");
                    window.location.href = "/Renter/renter.html";
                    break;
                case "3":
                    console.log("Redirecting to index.html");
                    window.location.href = "/index.html";
                    break;
                default:
                    console.log("hi")
                    break;
            }
            
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
        errorElement.textContent = "An error occurred. Please try again later.";
    });
}
