fetch('http://127.0.0.1:8000/api/allcars?status=pending')
.then(response => response.json())
.then(data => {
    // Populate the table with fetched data
    populateTable(data);
})
.catch(error => console.error('Error fetching data:', error));

function populateTable(data) {
const tableBody = document.getElementById("carsTableBody");

// Clear existing rows
tableBody.innerHTML = "";

// Iterate through the data and create table rows
data.forEach(car => {
    const row = document.createElement("tr");

    // Create cells for each column
    row.innerHTML = `
        <td>${car.name}</td>
        <td>${car.brand}</td>
        <td class="hover"><img src="http://127.0.0.1:8000/car/img/${car.img}" class="imageshoes"></td>
        <td class="hover"><img src="http://127.0.0.1:8000/car/img/${car.car_license}" class="imageshoes"></td>
        <td>${car.fuel_type}</td>
        <td>${car.gear}</td>
        <td>${car.location}</td>
        <td>${car.withDriver}</td>
        <td>${car.price_day}/Day</td>
        <td class="edit" onclick="updateCarStatus(${car.id}, 'Accept')"><i class="fa-solid fa-check"></i></td>
        <td class="delete" onclick="updateCarStatus(${car.id}, 'Reject')"><i class="fa-solid fa-x"></i></td>
    `;

    tableBody.appendChild(row);
});
}

// Function to update the status of a car
function updateCarStatus(carId, newStatus) {
// Make a PUT request to update the status
fetch(`http://127.0.0.1:8000/api/allcars/${carId}?status=${newStatus}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text-plain, /',
        'X-Requested-With': 'XMLHttpRequest',
    },
})
.then(response => {
    if (response.ok) {
        console.log(`Car with ID ${carId} status updated to ${newStatus}`);
        // Optionally, update the table after updating the status
        updateTable();
    } else {
        console.error(`Error updating status for car with ID ${carId}:`, response.statusText);
    }
})
.catch(error => console.error(`Error updating status for car with ID ${carId}:`, error));
}

// Function to update the table after accepting or rejecting a car
function updateTable() {
fetch('http://127.0.0.1:8000/api/allcars?status=pending')
    .then(response => response.json())
    .then(data => {
        // Populate the table with updated data
        populateTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}
const isLoggedIn = sessionStorage.getItem('isLoggedin');
let Logout = document.getElementById('Logout');
if (isLoggedIn === 'true') {
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