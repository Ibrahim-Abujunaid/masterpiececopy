// nav bar toggle
let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
}

   
  
  let name11=document.getElementById('name');
     name11.textContent=sessionStorage.getItem('name')

   // Fetch user ID from sessionStorage
  const userId = sessionStorage.getItem('userId');

fetch(`http://127.0.0.1:8000/api/rents/${userId}`)
    .then(response => response.json())
    .then(rentData => {
        rentData.forEach(rent => {
            const startDate = rent.start.split(' ')[0];
            const endDate = rent.end.split(' ')[0];

            var rentHtml = `
                <div class="card" data-rent-id="${rent.id}">
                    <img src="http://127.0.0.1:8000/car/img/${rent.img}" class="card-img" alt="Car Image">
                    <div class="card-body">
                        <h3>${rent.brand}</h3>
                        <p><strong>Landlord:</strong>${rent.landlord}</p>
                        <p><strong>Rental Date:</strong>${startDate}</p>
                        <p><strong>Return Date:</strong>${endDate}</p>
                        <p><strong>Transmission:</strong>${rent.gear}</p>
                        <p><strong>Fuel Type:</strong>${rent.fuel_type}</p>
                        <p><strong>Location:</strong>${rent.location}</p>
                        <p><strong>Driver:</strong>${rent.withDriver}</p>
                        <p><strong>Cost:</strong>${rent.total_price} JD</p>
                        <div class="stars" data-rent-id="${rent.id}">
                            <form class="${rent.status.toLowerCase() == 'pending' ? 'invisible' : ''}">
                                <input class="star star-5" id="star-5-${rent.id}" type="radio" name="rating" value="5" />
                                <label class="star star-5" for="star-5-${rent.id}"></label>
                                <input class="star star-4" id="star-4-${rent.id}" type="radio" name="rating" value="4" />
                                <label class="star star-4" for="star-4-${rent.id}"></label>
                                <input class="star star-3" id="star-3-${rent.id}" type="radio" name="rating" value="3" />
                                <label class="star star-3" for="star-3-${rent.id}"></label>
                                <input class="star star-2" id="star-2-${rent.id}" type="radio" name="rating" value="2" />
                                <label class="star star-2" for="star-2-${rent.id}"></label>
                                <input class="star star-1" id="star-1-${rent.id}" type="radio" name="rating" value="1" />
                                <label class="star star-1" for="star-1-${rent.id}"></label>
                            </form>
                        </div>
                        <p id="message-${rent.id}" class="message"></p>
                        <p class="status ${rent.status.toLowerCase()}">${rent.status}</p>
                        <div class="actions">
                            <i class="fa-solid fa-trash${rent.status.toLowerCase() == 'accepted' ? 'invisible' : ''}" onclick="deleteRent(${rent.id})"></i>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('rentsContainer').innerHTML += rentHtml;
        });
    })
    .catch(error => console.error('Error fetching rents:', error));

// Attach a single event listener to the container for dynamic elements
document.getElementById('rentsContainer').addEventListener('change', (event) => {
    const target = event.target;

    // Check if the changed element is a radio button
    if (target.type === 'radio' && target.classList.contains('star')) {
        const rentId = target.closest('.card').getAttribute('data-rent-id');
        const rating = target.value;
        submitRating(rentId, rating);
    }
});

function submitRating(rentId, rating) {
    const postData = {
        rent_id: rentId,
        rating: rating
    };

    fetch('http://127.0.0.1:8000/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text-plain, /',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then((data)  => {
        document.getElementById(`message-${rentId}`).textContent="your rating has been added";

        console.log('Rating submitted successfully:', data);
    })
    .catch(error => console.error('Error submitting rating:', error));
}


       fetch(`http://127.0.0.1:8000/api/rejects/${userId}`)
       .then(response => response.json())
       .then(rentData => {
           // Populate HTML structure for each rent
           rentData.forEach(rent => {
               // Extract only the date part
               const startDate = rent.start.split(' ')[0];
               const endDate = rent.end.split(' ')[0];

               var rentHtml = `
                   <div class="card" data-rent-id="${rent.id}">
                       <img src="http://127.0.0.1:8000/car/img/${rent.img}" class="card-img" alt="Car Image">
                       <div class="card-body">
                           <h3>${rent.brand}</h3>
                           <p><strong>Landlord:</strong>${rent.landlord}</p>
                           <p><strong>Rental Date:</strong>${startDate}</p>
                           <p><strong>Return Date:</strong>${endDate}</p>
                           <p><strong>Transmission:</strong>${rent.gear}</p>
                           <p><strong>Fuel Type:</strong>${rent.fuel_type}</p>
                           <p><strong>Location:</strong>${rent.location}</p>
                           <p><strong>Driver:</strong>${rent.withDriver}</p>
                           <p class="status ${rent.status.toLowerCase()}">${rent.status}</p>
                           <div class="actions">
                               <i class="fa-solid fa-trash delete" onclick="deleteRent1(${rent.id})"></i>
                           </div>
                       </div>
                   </div>
               `;

               // Append the rentHtml to the rentsContainer
               document.getElementById('rentsContainer').innerHTML += rentHtml;
           });
       })
       .catch(error => console.error('Error fetching rents:', error));


       
       function deleteRent1(rentId) {
        
        // Perform the deletion using the API
        fetch(`http://127.0.0.1:8000/api/rejects/${rentId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted rent from the UI
                const cardToDelete = document.querySelector(`.card[data-rent-id="${rentId}"]`);
                if (cardToDelete) {
                    cardToDelete.remove();
                }
            } else {
                console.error('Error deleting rent:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting rent:', error));
    
}
   // Function to delete a rent by ID
   function deleteRent(rentId) {
        
           // Perform the deletion using the API
           fetch(`http://127.0.0.1:8000/api/rents/${rentId}`, {
               method: 'DELETE',
           })
           .then(response => {
               if (response.ok) {
                   // Remove the deleted rent from the UI
                   const cardToDelete = document.querySelector(`.card[data-rent-id="${rentId}"]`);
                   if (cardToDelete) {
                       cardToDelete.remove();
                   }
               } else {
                   console.error('Error deleting rent:', response.statusText);
               }
           })
           .catch(error => console.error('Error deleting rent:', error));
       
   }
   