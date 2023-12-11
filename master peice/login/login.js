let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
}
function validateLoginForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var errorElement = document.getElementById("loginError");

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.match(emailRegex)) {
        errorElement.textContent = "Invalid email address";
        return;
    }

    if (!password || password.length < 6 || password.length > 18) {
        errorElement.textContent = "Password must be between 6 and 18 characters";
        return;
    }

    errorElement.textContent = "";

    // Create the data object to be sent to the server
    var data = {
        email: email,
        password: password
    };

    // Fetch API to post login data to the server
    fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, /",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(userData => {
        console.log(userData);
        // Assuming the server returns user data including role_id and user_id
        var roleId = userData.user.role_id;
        var id = userData.user.id;
        var name =userData.user.name;
        // Save role id, user id, and isLoggedin in session storage
        sessionStorage.setItem('name',name)
        sessionStorage.setItem('roleId', roleId);
        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('isLoggedin', true);

        // Redirect based on role id
        if (roleId === 2) {
            window.location.href = "/Renter/renter.html";
        } else if (roleId === 3) {
            window.location.href = "/index.html";
        } else if (roleId === 1) {
            window.location.href = "/admin2/admin/Salls/index.html";
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
        errorElement.textContent = "Invalid email or password. Please try again.";
    });
}
