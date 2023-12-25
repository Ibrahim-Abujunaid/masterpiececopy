function fetchAndPopulateTable() {
    fetch('http://127.0.0.1:8000/api/users/?role_id=2')
        .then(response => response.json())
        .then(data => {
            // Populate the table with fetched data
            populateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to populate the table with data
function populateTable(data) {
    const tableBody = document.getElementById("userTableBody");
    const searchInput = document.getElementById("search");
    const searchTerm = searchInput.value.toLowerCase();

    // Clear existing rows
    tableBody.innerHTML = "";

    // Filter data based on the search term
    const filteredData = data.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    // Iterate through the filtered data and create table rows
    filteredData.forEach((user, index) => {
        const row = document.createElement("tr");

        // Create cells for each column
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>Landloard</td>
            <td>${user.car_count}</td>
            <td class="edit"><a href="edit4.html?id=${user.id}"><i class="fa-solid fa-pen"></a></td>
            <td class="delete" onclick="deleteUser(${user.id})"><i class="fa-solid fa-trash"></i></td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to handle the delete action
function deleteUser(userId) {
    fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text-plain, /',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log(`User with ID ${userId} deleted successfully`);
                // Fetch and populate the table again after deletion
                fetchAndPopulateTable();
            } else {
                console.error(`Error deleting user with ID ${userId}:`, response.statusText);
            }
        })
        .catch(error => console.error(`Error deleting user with ID ${userId}:`, error));
}

// Initial population of the table
fetchAndPopulateTable();

// Event listener for the search input
document.getElementById("search").addEventListener("input", function() {
    // Update the table based on the new search term
    fetchAndPopulateTable();
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