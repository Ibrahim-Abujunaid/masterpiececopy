// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
        nav1.classList.toggle('activ');
}

document.addEventListener('DOMContentLoaded', () => {
        // Fetch data for the specific car
        const carId = window.location.hash.substring(1);

        fetch(`http://127.0.0.1:8000/api/cars/${carId}`)
                .then(response => response.json())
                .then(data => {

                        fetch(`http://127.0.0.1:8000/api/drivers/${data.car[0].owner_id}`)
                                .then(response => response.json())
                                .then(driver => {
                                        console.log(driver)


                                        document.getElementById('driver').innerHTML =
                                                `
                                         <div class="driver">
                                         <div class="img1">
                                             <img src="http://127.0.0.1:8000/car/img/${driver[0].img}" alt="">
                                         </div>
                                         <div class="info_driver">
                                             <span>Driver name : ${driver[0].name}</span>
                                             <span>Driver age : ${driver[0].age}</span>
                                         </div>
                                     </div>
                                        
                                    `;
                                });
                        // Populate car details
                        populateCarDetails(data.car[0]);

                        // Initialize flatpickr for date picking
                        initializeFlatpickr(data.bookedDates);
                })
                .catch(error => console.error('Error fetching car details:', error));
});

function populateCarDetails(car) {
        document.getElementById('carImage').src = `http://127.0.0.1:8000/car/img/${car.img}`;
        document.getElementById('carName').textContent = car.brand;
        document.getElementById('carDetails').innerHTML = `
            <div>
                <span><i class="fa-solid fa-circle-exclamation"></i>Transmission</span>
                <span>${car.gear}</span>
            </div>
            <div>
                <span><i class="fa-solid fa-location-crosshairs"></i>Fuel type</span>
                <span>${car.fuel_type}</span>
            </div>
            <div>
                <span><i class="fa-solid fa-location-dot"></i>Location</span>
                <span>${car.location}</span>
            </div>
            <div>
                <span><i class="fa-solid fa-greater-than"></i>Renter</span>
                <span>${car.name}</span>
            </div>
        `;
        document.getElementById('pricePerDay').textContent = car.price_day.toFixed(2);
}

function initializeFlatpickr(bookedDates) {
        const rentalDateInput = document.getElementById('rentalDate');
        const returnDateInput = document.getElementById('returnDate');

        // Set minDate to today
        const today = new Date().toISOString().split('T')[0];

        // Set up Flatpickr for rental date input
        flatpickr(rentalDateInput, {
                dateFormat: 'Y-m-d',
                minDate: today,
                disable: bookedDates, // Disable booked dates
                onChange: function (selectedDates, dateStr, instance) {
                        // Update return date minDate to be the selected rental date
                        if (selectedDates.length > 0) {
                                const selectedDate = selectedDates[0];
                                const returnMinDate = new Date(selectedDate);
                                returnMinDate.setDate(returnMinDate.getDate()); // Set minimum return date to the next day
                                flatpickr(returnDateInput, { minDate: returnMinDate });
                        }
                },
        });

        // Set up Flatpickr for return date input
        flatpickr(returnDateInput, {
                dateFormat: 'Y-m-d',
                minDate: today,
                disable: bookedDates, // Disable booked dates
        });
}

document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();
        const isLoggedin = sessionStorage.getItem('isLoggedin');
        if (!isLoggedin) {
                alert('Please log in to confirm the booking.');
                return;
        }

        const startDate = document.getElementById('rentalDate').value;
        const endDate = document.getElementById('returnDate').value;
        if (startDate.trim() === "" || endDate.trim() === "") {
                alert('shold add start date or end date')
        } else if (startDate > endDate) {
                alert('Return date should be after the rental date.');
                return;
        } else {
                const start = document.getElementById('rentalDate').value;
                const end = document.getElementById('returnDate').value;
                const userId = sessionStorage.getItem('userId');
                const carId = window.location.hash.substring(1);
                const bookingData = {
                        start,
                        end,
                        user_id: userId,
                        car_id: carId
                };
                console.log(bookingData)
                fetch('http://127.0.0.1:8000/api/rents/', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json, text-plain, /',
                                'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: JSON.stringify(bookingData)
                })
                        .then(response => response.json())
                        .then(data => {
                                // Handle the response from the server as needed
                                alert("Booking pending wait landloard Accept", start, end);
                                window.location.href="/profile/Orders/orders.html";
                                // window.location.reload();
                                console.log('Booking successful:', data);
                                // You may want to redirect or show a success message
                        })
                        .catch(error => console.error('Error confirming booking:', error));
        }
});

document.addEventListener('DOMContentLoaded', () => {
        const carId = window.location.hash.substring(1);
        const commentSection = document.getElementById('commentSection');

        // Fetch comments from the API
        fetch(`http://127.0.0.1:8000/api/comments/${carId}`)
                .then(response => response.json())
                .then(comments => {
                        // Display comments
                        displayComments(commentSection, comments);
                })
                .catch(error => console.error('Error fetching comments:', error));
});

function displayComments(commentSection, comments) {
        // Check if there are no comments
        if (comments.length === 0) {
                commentSection.innerHTML = `<p>No comments available.</p>`;
                return;
        }

        // Clear previous comments
        commentSection.innerHTML = '';

        // Loop through comments and create HTML elements
        comments.forEach(comment => {
                const commentWrapper = document.createElement('div');
                commentWrapper.classList.add('commented-section');
                const formattedDateTime = formatDateTime(comment.created_at);
                const commentHtml = `
                <div class="d-flex flex-row align-items-center commented-user">
                    <h5 class="mr-2">${comment.name}</h5>
                    <span class="dot mb-1"></span>
                    <span class="mb-1 ml-2">${formattedDateTime}</span>
                </div>
                <div class="comment-text-sm">
                    <span>${comment.content}</span>
                </div>
                <div class="reply-section">
                    <!-- Add reply section if needed -->
                </div>
                <hr>
            `;

                commentWrapper.innerHTML = commentHtml;
                commentSection.appendChild(commentWrapper);
        });
}

function postComment() {
        const commentInput = document.getElementById('commentInput').value;
        const userId = sessionStorage.getItem('userId');
        const carId = window.location.hash.substring(1);

        const commentData = {
                content: commentInput,
                user_id: userId,
                car_id: carId
        };

        fetch('http://127.0.0.1:8000/api/comments/', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json, text-plain, /',
                        'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(commentData)
        })
                .then(response => response.json())
                .then(newComment => {
                        // Assuming the API returns the newly created comment
                        // Update the UI to display the new comment
                        const commentSection = document.getElementById('commentSection');
                        const commentWrapper = document.createElement('div');
                        commentWrapper.classList.add('commented-section');

                        // Format the date and time for the new comment
                        const formattedDateTime = formatDateTime(newComment.created_at);

                        const commentHtml = `
                <div class="d-flex flex-row align-items-center commented-user">
                    <h5 class="mr-2">${newComment.name}</h5>
                    <span class="dot mb-1"></span>
                    <span class="mb-1 ml-2">${formattedDateTime}</span>
                </div>
                <div class="comment-text-sm">
                    <span>${newComment.content}</span>
                </div>
                <div class="reply-section">
                    <!-- Add reply section if needed -->
                </div>
                <hr>
            `;

                        commentWrapper.innerHTML = commentHtml;
                        commentSection.appendChild(commentWrapper);

                        // Fetch and display updated comments
                        fetch(`http://127.0.0.1:8000/api/comments/${carId}`)
                                .then(response => response.json())
                                .then(updatedComments => {
                                        displayComments(commentSection, updatedComments);
                                })
                                .catch(error => console.error('Error fetching updated comments:', error));
                })
                .catch(error => console.error('Error posting comment:', error));
}

function formatDateTime(dateTimeString) {
        const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
        };

        const formattedDateTime = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDateTime.replace(',', ' at');
}




