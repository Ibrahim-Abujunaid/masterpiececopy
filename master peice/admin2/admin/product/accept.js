fetch('http://127.0.0.1:8000/api/allcars/?status=Accept')
.then(response => response.json())
.then(data => {
    // Populate the table with fetched data
    populateTable(data);
})
.catch(error => console.error('Error fetching data:', error));

function populateTable(data) {
const tableBody = document.getElementById("acceptedOrdersTableBody");

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
        <td>${car.fuel_type}</td>
        <td>${car.gear}</td>
        <td>${car.location}</td>
        <td>${car.withDriver}</td>
        <td>${car.price_day}/Day</td>
        <td><i class="fa-solid ${car.availability}"></i></td>
        <td class="edit">Accepted</td>
    `;

    tableBody.appendChild(row);
});
}

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