function updateCarAvailability(carId, checkbox) {
    const availability = checkbox.checked ? 1 : 0;

    fetch(`http://127.0.0.1:8000/api/cars/${carId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, /",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({
            _method: 'PUT',
            availability: availability,
        }),
    })
        .then(response => response.json())
        .then(updatedCar => {
            console.log(`Car with ID ${carId} availability updated successfully`);
        })
        .catch(error => console.error(`Error updating car availability for ID ${carId}:`, error));
}
let name11 = document.getElementById('name');
name11.textContent = sessionStorage.getItem('name')

function logout() {
    sessionStorage.clear();
    window.location.href = "/index.html"
}
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
            if (response.ok) {
                console.log("Car deleted successfully");
                location.reload();
            } else {
                console.error("Error deleting car:", response.statusText);
            }
        })
        .catch(error => console.error('Error deleting car:', error));
}
// nav bar toggle
document.addEventListener("DOMContentLoaded", function () {
    let nav1 = document.getElementById("nav1");
    let menu = document.getElementById("menu");
    menu.onclick = () => {
        nav1.classList.toggle('activ');
    }

    // Function to toggle blur class on specified elements
    function toggleBlur(isBlur) {
        const elementsToBlur = document.querySelectorAll('.header, .footer, section');
        elementsToBlur.forEach(element => {
            if (isBlur) {
                element.classList.add('blur');
            } else {
                element.classList.remove('blur');
            }
        });
    }

    // Function to toggle driver details pop-up
    function toggleDriverPopup(isVisible) {
        const driverPopup = document.getElementById('driverPopup');
        if (isVisible) {
            driverPopup.style.display = 'block';
            toggleBlur(true); // Blur effect on pop-up display
        } else {
            driverPopup.style.display = 'none';
        }
    }
    document.getElementById('addCar').addEventListener('click', function () {
        document.getElementById('addCarForm').style.right = '0';
        toggleBlur(true); // Blur effect on form display
    });
    // Add Car Form Script
    document.getElementById('addCar').addEventListener('click', function () {
        document.getElementById('addCarForm').style.right = '0';
        toggleBlur(true); // Blur effect on form display
    });

    document.getElementById('closeForm').addEventListener('click', function () {
        document.getElementById('addCarForm').style.right = '-400px';
        toggleBlur(false); // Remove blur effect when form is closed
        toggleDriverPopup(false);

    });
    document.getElementById('addVehicle').addEventListener('click', function () {
        document.getElementById('addCarForm').style.right = '-400px';
        toggleBlur(false); // Remove blur effect when form is closed
        toggleDriverPopup(false);

    });

    document.getElementById('driver').addEventListener('change', function () {
        // Check if the driver option is selected
        const driverOption = document.getElementById('driver');
        if (driverOption.value === "1") {
            toggleDriverPopup(true);
        } else {
            toggleDriverPopup(false);
        }
    });

    // Close the driver pop-up on clicking the close button
    document.getElementById('closeDriverPopup').addEventListener('click', function () {
        toggleDriverPopup(false);
    });

    document.getElementById("submitDriverDetails").addEventListener('click', function () {
        // Add logic to submit driver details here

        // Close the driver popup after submitting details
        toggleDriverPopup(false);
    });


    // Get the select elements
    var selectBrands = document.getElementById("brands");
    var selectLocation = document.getElementById("location");

    // Fetch brands data from the API
    fetch('http://127.0.0.1:8000/api/brands/')
        .then(response => response.json())
        .then(data => {
            // Populate brands select
            data.forEach(item => {
                var option = document.createElement("option");
                option.value = item.id;
                option.text = item.name;
                selectBrands.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching brands data:', error));

    // Fetch locations data from the API
    fetch('http://127.0.0.1:8000/api/locations/')
        .then(response => response.json())
        .then(data => {
            // Populate locations select
            data.forEach(item => {
                var option = document.createElement("option");
                option.value = item.id;
                option.text = item.name;
                selectLocation.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching locations data:', error));


    // Fetch and populate brands and locations options (similar to the previous example)

    // Car Form
    var addVehicleButton = document.getElementById("addVehicle");
    if (addVehicleButton) {
        addVehicleButton.addEventListener("click", function (e) {
            e.preventDefault();

            // Create FormData object
            const formData = new FormData();
            formData.append("img", document.getElementById("carImage").files[0]);
            formData.append("car_license", document.getElementById("CarLicense").files[0]);
            formData.append("price_day", document.getElementById("cost").value);
            formData.append("withDriver", document.getElementById("driver").value);
            formData.append("availability", 1);
            formData.append("status", "pending");
            formData.append("brand_id", document.getElementById("brands").value);
            formData.append("owner_id", sessionStorage.getItem("userId"));
            formData.append("location_id", document.getElementById("location").value);
            formData.append("gear", document.getElementById("transmission").value);
            formData.append("fuel_type", document.getElementById("fuelType").value);

            // Perform the POST request
            fetch('http://127.0.0.1:8000/api/cars', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData  // Use FormData instead of JSON.stringify
            })
                .then(response => response.json())
                .then(data => {
                    window.location.reload();
                    console.log('Car added successfully:', data);
                })
                .catch(error => console.error('Error adding car:', error));
        });
    }

    // Driver Form
    document.getElementById('driverDetailsForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const driver_license = document.getElementById('driverLicense').files[0];
        const driver_img = document.getElementById('driverImage').files[0];

        const formData = new FormData();
        formData.append('driver_license', driver_license);
        formData.append('img', driver_img);
        formData.append('age', document.getElementById("driverAge").value);
        formData.append("user_id", sessionStorage.getItem("userId"));
        fetch('http://127.0.0.1:8000/api/drivers/', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
                // Handle successful upload
                console.log('Driver license uploaded successfully:', data);
            })
            .catch(error => {
                console.error('Error uploading driver license:', error);
            });
    });

    // -----------------------------------read-------------------
    // Get user ID from sessionStorage
    const userId = sessionStorage.getItem("userId");

fetch(`http://127.0.0.1:8000/api/allcars/${userId}`)
    .then(response => response.json())
    .then(data => {
        // Populate the table with fetched data
        populateTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function populateTable(data) {
    const tableBody = document.getElementById("carTableBody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Iterate through the data and create table rows
    data.forEach(car => {
        const row = document.createElement("tr");

        // Create unique checkbox ID for each row
        const checkboxId = `available_${car.id}`;
        console.log(car)

        // Create cells for each column
        row.innerHTML += `
            <td><input type="checkbox" onchange="updateCarAvailability(${car.id}, this)" id="${checkboxId}" class="Availability"></td>
            <td><img src="http://127.0.0.1:8000/car/img/${car.img}"></td>
            <td>${car.brand}</td>
            <td>${car.gear}</td>
            <td>${car.fuel_type}</td>
            <td>${car.location}</td>
            <td>${car.withDriver}</td>
            <td>${car.price_day}/Day</td>
            <td class="${car.status.toLowerCase()}">${car.status}</td>
            <td class="delete" onclick="deleteCar(${car.id})"><i class="fa-solid fa-trash"></i></td>
        `;
        tableBody.appendChild(row);
        // Check the checkbox based on the availability property
        document.getElementById(checkboxId).checked = car.availability === 1;
    });
}


    // Function to handle the checkbox change and update car availability

  
   
})
// ----------------------------------------- availabality -----------------------------
