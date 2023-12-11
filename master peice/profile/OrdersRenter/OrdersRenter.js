// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
        nav1.classList.toggle('activ');
}

let name11 = document.getElementById('name');
name11.textContent = sessionStorage.getItem('name');

let isLogged = sessionStorage.getItem("isLoggedin");
let role = sessionStorage.getItem("roleId")
if (isLogged != "true") {
        window.location.href = "/login/login.html";
        alert("login please");
} 

const userId = sessionStorage.getItem('userId');

// Fetch data from the API
fetch(`http://127.0.0.1:8000/api/rents/${userId}`)
        .then(response => response.json())
        .then(rentData => {
                // Populate HTML structure for each rent
                rentData.forEach(rent => {
                        // Extract only the date part
                        const startDate = rent.start.split(' ')[0];
                        const endDate = rent.end.split(' ')[0];

                        const rentHtml = `
                    <div class="card">
                        <img src="http://127.0.0.1:8000/car/img/${rent.img}" class="card-img" alt="Car Image">
                        <div class="card-body">
                            <h3>${rent.brand}</h3>
                            <p><strong>Renter name:</strong> ${rent.renter}</p>
                            <p><strong>PhoneNum:</strong> ${rent.phone}</p>
                            <p><strong>Rental Date:</strong> ${startDate}</p>
                            <p><strong>Return Date:</strong> ${endDate}</p>
                            <p><strong>Transmission:</strong> ${rent.gear}</p>
                            <p><strong>Fuel Type:</strong> ${rent.fuel_type}</p>
                            <p><strong>Location:</strong> ${rent.location}</p>
                            <p><strong>Driver:</strong> ${rent.withDriver}</p>
                            <p><strong>Cost:</strong> ${rent.total_price} JD/Day</p>
                            <p class="status ${rent.status.toLowerCase()}">${rent.status}</p>
                            <div class="actions">
                                <span class="${rent.status.toLowerCase() == 'accepted' ? 'invisible' : ''}">
                                    <i class="fa-solid fa-x reject" onclick="rejectRent(${rent.id})"></i>
                                </span>
                                <span><i class="fa-solid fa-check accept" onclick="acceptRent(${rent.id})"></i></span>
                            </div>
                        </div>
                    </div>
                `;

                        // Append the rentHtml to the rentsContainer
                        document.getElementById('rentsContainer').innerHTML += rentHtml;
                });
        })
        .catch(error => console.error('Error fetching rents:', error));


// Function to reject a rent by ID
function rejectRent(rentId) {
        fetch('http://127.0.0.1:8000/api/rejects/', {
                method: 'POST',
                headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json, text-plain, /",
                        "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify({
                        id: rentId
                }),
        })
                .then(response => response.json())
                .then(responseData => {
                        window.location.reload();
                        // Handle the response, update UI, or perform any additional actions
                        console.log(`Rent with ID ${rentId} rejected successfully`);
                })
                .catch(error => console.error(`Error rejecting rent with ID ${rentId}:`, error));
}




// Function to accept a rent by ID

function acceptRent(rentId) {
        updateRentStatus(rentId);
        // window.location.reload();
}

// Function to update the rent status
function updateRentStatus(rentId) {
        fetch(`http://127.0.0.1:8000/api/rents/${rentId}?accept=1`, {
                method: 'PUT',
                headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json, text-plain, /",
                        "X-Requested-With": "XMLHttpRequest"
                },
        })
                .then(response => response.json())
                .then(updatedRent => {
                     window.location.reload();

                        // Update the UI or perform any additional actions
                        console.log(`Rent with ID ${rentId}ed successfully`);
                })
                .catch(error => console.error(`Error ing rent with ID ${rentId}:`, error));
}