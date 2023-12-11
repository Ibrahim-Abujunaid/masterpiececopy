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
