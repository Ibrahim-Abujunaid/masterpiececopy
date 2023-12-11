
function orders(){
let order = document.getElementById('order');
let role = sessionStorage.getItem('roleId')
if (role == 3) {
        order.addEventListener('click', (e) => {
                window.location.href = 'Orders/orders.html';
        });
}else if(role == 2){
        order.addEventListener('click', (e) => {
                window.location.href = 'OrdersRenter/OrdersRenter.html';
        }); 
}else{
  order.style.display='none';
}
}
// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
        nav1.classList.toggle('activ');
}
function readprofile(){
const userId = sessionStorage.getItem('userId');

// Make API request to fetch user data
fetch(`http://127.0.0.1:8000/api/users/${userId}`)
  .then(response => response.json())
  .then(data => {
        console.log(data)
        console.log(data[0].email)
    // Update the HTML content with the retrieved data
    document.getElementById('UserType').innerHTML = `<strong>User Type:</strong> ${data[0].role}`;
    document.getElementById('username').innerHTML = `<strong>Name:</strong> ${data[0].name}`;
    document.getElementById('phoneNumber').innerHTML = `<strong>Phone:</strong> ${data[0].phone}`;
    document.getElementById('email').innerHTML = `<strong>Email:</strong> ${data[0].email}`;
    console.log(data[0].email)
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
    document.getElementById('usernameInput').value = data[0].name;
    document.getElementById('phoneInput').value = data[0].phone;
    document.getElementById('emailInput').value = data[0].email;
  })
  .catch(error => console.error('Error fetching user data:', error));

// Update user information on button click

document.getElementById('updateBtn').addEventListener('click', () => {
  const username = document.getElementById('usernameInput').value;
  const phone = document.getElementById('phoneInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  
  

  // Make API request to update user data
  fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text-plain, */*',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      _method: 'PUT',
      name: username,
      phone: phone,
      email: email,
      password: password,
    }),
  })
  .then(response => response.json())
  .then(updatedData => {
    // Handle success, if needed
    console.log('User data updated:', updatedData);
  })
  .catch(error => console.error('Error updating user data:', error));
});

