
function orders() {
  let order = document.getElementById('order');
  let role = sessionStorage.getItem('roleId')
  if (role == 3 || role == 1) {
    order.addEventListener('click', (e) => {
      window.location.href = 'Orders/orders.html';
    });
  } else if (role == 2) {
    order.addEventListener('click', (e) => {
      window.location.href = 'OrdersRenter/OrdersRenter.html';
    });
  }
}
// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
  nav1.classList.toggle('activ');
}
function readprofile() {
  const userId = sessionStorage.getItem('userId');

  // Make API request to fetch user data
  fetch(`http://127.0.0.1:8000/api/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data[0].email);
      console.log(data[0].img);

      // Set default image source if img is null
      const imgSrc = data[0].img ? `http://127.0.0.1:8000/user/${data[0].img}` : '../img/team/profile1.png';
      document.getElementById('profileImage').src = imgSrc;

      document.getElementById('UserType').innerHTML = `<strong>User Type:</strong> ${data[0].role}`;
      document.getElementById('username').innerHTML = `<strong>Name:</strong> ${data[0].name}`;
      document.getElementById('phoneNumber').innerHTML = `<strong>Phone:</strong> ${data[0].phone}`;
      document.getElementById('email').innerHTML = `<strong>Email:</strong> ${data[0].email}`;
      console.log(data[0].email);
      //emailContainer
    })
    .catch(error => console.error('Error fetching user data:', error));
}
readprofile();

const userId = sessionStorage.getItem('userId');
console.log(userId);
// Fetch user data and populate the form
fetch(`http://127.0.0.1:8000/api/users/${userId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const imgSrc = data[0].img ? `http://127.0.0.1:8000/user/${data[0].img}` : '../img/team/profile1.png';
    document.getElementById('userImage').src = imgSrc;
    document.getElementById('usernameInput').value = data[0].name;
    document.getElementById('phoneInput').value = data[0].phone;
    document.getElementById('emailInput').value = data[0].email;
  })
  .catch(error => console.error('Error fetching user data:', error));

// Update user information on button click

// document.getElementById('updateBtn').addEventListener('click', () => {
//   const username = document.getElementById('usernameInput').value;
//   const phone = document.getElementById('phoneInput').value;
//   const email = document.getElementById('emailInput').value;
//   const password = document.getElementById('passwordInput').value;



//   // Make API request to update user data
//   fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json, text-plain, */*',
//       'X-Requested-With': 'XMLHttpRequest',
//     },
//     body: JSON.stringify({
//       _method: 'PUT',
//       name: username,
//       phone: phone,
//       email: email,
//       password: password,
//     }),
//   })
//   .then(response => response.json())
//   .then(updatedData => {
//     // Handle success, if needed
//     console.log('User data updated:', updatedData);
//   })
//   .catch(error => console.error('Error updating user data:', error));
// });

document.getElementById('updateBtn').addEventListener('click', () => {
  const username = document.getElementById('usernameInput').value;
  const phone = document.getElementById('phoneInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const old_password = document.getElementById('OldPassword').value;
  const error = document.getElementById('Validerror');
  const imgInput = document.getElementById('imgg');

  // Validation for name (should only contain letters)
  const nameRegex = /^[A-Za-z ]+$/;
  if (!nameRegex.test(username)) {
    error.textContent = 'Name should contain only letters.';
    return;
  }

  // Validation for email (should be a valid email address)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.textContent = 'Invalid email address.';
    return;
  }


  const formData = new FormData();
  formData.append('_method', 'PUT');
  formData.append('name', username);
  formData.append('phone', phone);
  formData.append('email', email);
  


  // Check if a file is selected
  if (imgInput.files.length > 0) {
    formData.append('img', imgInput.files[0]);
  }

  if (!(password.trim() ==="")) {
     if (old_password.trim() ==="") {
      error.textContent = 'old password is required';
      return;
    } else if (!password || password.length < 6 || password.length > 18) {
      error.textContent = 'Password should be at least 6 characters long.';
      return;
    }else{
      formData.append('password', password);
      formData.append('old_password', old_password);
    }
  }
  // Make API request to update user data
  fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
    method: 'POST',  // Still using POST, as some servers may not support PUT in forms
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: formData,
  })
    .then(response => response.json())
    .then(updatedData => {
      // Handle success, if needed
      error.textContent = updatedData;
      console.log('User data updated:', updatedData);
    })
    .catch(error => console.error('Error updating user data:', error));

  // Clear previous error messages
  error.textContent = '';
  // window.location.reload();
});


