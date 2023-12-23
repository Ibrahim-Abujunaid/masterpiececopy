let signupButtonNav = document.getElementById('addBtn');
let Dashboard=document.getElementById("contact");
let loginButtonNav = document.getElementById('loginbtn');

// Check if the user is logged in
const Role = sessionStorage.getItem('roleId');
const isLoggedIn = sessionStorage.getItem('isLoggedin');
if (isLoggedIn == 'true' && Role == 1) {
  signupButtonNav.textContent = 'Profile';
  signupButtonNav.addEventListener('click', (e) => {
    window.location.href = '/profile/profile.html';
  });
  loginButtonNav.textContent = 'Logout';
  loginButtonNav.addEventListener('click', (e) => {
    window.location.href = '/index.html';
    sessionStorage.clear();
  });
  Dashboard.textContent='Dashboard';
  Dashboard.addEventListener('click',()=>{
    window.location.href="/admin2/admin/product/index.html";
  })
  
} else if (isLoggedIn === 'true' && Role == 2) {
  // Change text and behavior for logged-in users
  Dashboard.textContent='Dashboard';
  signupButtonNav.textContent = 'Profile';
  loginButtonNav.textContent = 'Log out';
  
  Dashboard.addEventListener('click',()=>{
    window.location.href="/Renter/renter.html";
  })
  loginButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/index.html';

    sessionStorage.clear();;
  });

  signupButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/profile/profile.html';
  });
} else if (isLoggedIn === 'true') {
  // Change text and behavior for logged-in users
  signupButtonNav.textContent = 'Profile';
  loginButtonNav.textContent = 'Log out';

  loginButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/index.html';
    sessionStorage.clear();;
  });

  signupButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/profile/profile.html';
  });
}else{
  signupButtonNav.addEventListener('click', (e) => {

    window.location.href = "signup.html"
  });

  loginButtonNav.addEventListener('click', (e) => {
    window.location.href = "/login/login.html"
  });
}






document.getElementById('subscribeBtn').addEventListener('click', () => {
  const emailInput = document.getElementById('subscribe').value;
  const errorElement = document.getElementById('err');

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput)) {
    errorElement.textContent = 'Invalid email address';
    return;
  }

  // Clear previous error messages
  errorElement.textContent = '';

  // Make the fetch request
  fetch('http://127.0.0.1:8000/api/supscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json,/',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({ email: emailInput }),
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response as needed
    console.log('Subscription response:', data);
  })
  .catch(error => console.error('Error subscribing:', error));
});





