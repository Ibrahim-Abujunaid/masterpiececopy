let brandCounter = 0;

// Fetch data from the API
fetch('http://127.0.0.1:8000/api/brands/')
    .then(response => response.json())
    .then(data => {
        // Populate the table with fetched data
        populateTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function populateTable(data) {
    const tableBody = document.getElementById("brandsTableBody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Iterate through the data and create table rows
    data.forEach(brand => {
        const row = document.createElement("tr");

        // Increment the counter for each brand
        brandCounter++;

        // Create cells for each column
        row.innerHTML = `
            <td>${brandCounter}</td>
            <td>${brand.name}</td>
            <td class="delete" onclick="deleteBrand(${brand.id})"><i class="fa-solid fa-trash"></i></td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to handle the delete action
function deleteBrand(brandId) {
    fetch(`http://127.0.0.1:8000/api/brands/${brandId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text-plain, /',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log(`Brand with ID ${brandId} deleted successfully`);
                // Fetch and populate the table again after deletion
                fetch('http://127.0.0.1:8000/api/brands/')
                    .then(response => response.json())
                    .then(data => {
                        populateTable(data);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            } else {
                console.error(`Error deleting brand with ID ${brandId}:`, response.statusText);
            }
        })
        .catch(error => console.error(`Error deleting brand with ID ${brandId}:`, error));
}

document.getElementById('brandForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get brand name from the form
    const brandName = document.getElementById('Brand').value;

    // Make API request to create a new brand
    fetch('http://127.0.0.1:8000/api/brands/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text-plain, /',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
            name: brandName,
        }),
    })
        .then(response => response.json())
        .then(createdBrand => {
            setTimeout(500);
            window.location.href = 'index.html?message=Success';
            // Handle success, e.g., show a success message
            console.log('Brand created successfully:', createdBrand);
        })
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
