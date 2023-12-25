
function deleteCar(carId) {
    fetch(`http://127.0.0.1:8000/api/cars/${carId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, /",
            "X-Requested-With": "XMLHttpRequest"
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Car deleted successfully:', data);
        // Fetch updated data and populate the table again
        fetchDataAndPopulateTable();
    })
    .catch(error => console.error('Error deleting car:', error));
}

// Function to fetch data from the server and populate the table
function fetchDataAndPopulateTable() {
    fetch('http://127.0.0.1:8000/api/allcars/?status=Accept')
        .then(response => response.json())
        .then(data => {
            // Populate the table with fetched data
            populateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initial fetch and table population
fetchDataAndPopulateTable();

// Function to populate the table with data
function populateTable(data) {
    const tableBody = document.getElementById("acceptedOrdersTableBody");
    const searchInput = document.getElementById("search");
    const searchTerm = searchInput.value.toLowerCase();

    // Clear existing rows
    tableBody.innerHTML = "";

    // Filter data based on the search term
    const filteredData = data.filter(car =>
        car.name.toLowerCase().includes(searchTerm)
    );

    // Iterate through the filtered data and create table rows
    filteredData.forEach(car => {
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
            <td class="delete" onclick="deleteCar(${car.id})"><i class="fa-solid fa-trash"></i></td>
        `;

        tableBody.appendChild(row);
    });
}

// Event listener for the search input
document.getElementById("search").addEventListener("input", function() {
    // Update the table based on the new search term
    fetchDataAndPopulateTable();
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