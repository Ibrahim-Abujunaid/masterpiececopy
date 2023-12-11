const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get('id');
console.log(id)
// Fetch user details based on the ID
fetch(`http://127.0.0.1:8000/api/users/${id}`)
    .then(response => response.json())
    .then(user => {
        console.log(user)
        // Populate the form with existing data
        document.getElementById('username').value = user[0].name;
        document.getElementById('PhoneNum').value = user[0].phone;
        document.getElementById('email').value = user[0].email;
    })
    .catch(error => console.error('Error fetching user data:', error));

// Handle form submission
document.getElementById('updateForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get updated values from the form
    const updatedUsername = document.getElementById('username').value;
    const updatedPhoneNum = document.getElementById('PhoneNum').value;
    const updatedEmail = document.getElementById('email').value;

    // Make API request to update user data
    fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text-plain, /',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
            _method: 'PUT',
            name: updatedUsername,
            phone: updatedPhoneNum,
            email: updatedEmail,
        }),
    })
    .then(response => response.json())
    .then(updatedData => {
        alert('User data updated:', updatedUsername)
        window.location.href='index.html'
        // Handle success, e.g., show a success message
        console.log('User data updated:', updatedData);
    })
    .catch(error => console.error('Error updating user data:', error));
});

const isLoggedIn = sessionStorage.getItem('isLoggedin');
let Logout = document.getElementById('Logout');
let Role =sessionStorage.getItem("roleId")
if (isLoggedIn === 'true' && Role == 1) {
  // Change text and behavior for logged-in users
  Logout.textContent = 'Log out';

  Logout.addEventListener('click', (e) => {
      // Log out logic
      window.location.href = '/index.html';
      sessionStorage.clear();
  });
} else {
    window.location.href = '/login/login.html';
}