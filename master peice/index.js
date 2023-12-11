// nav bar toggle
let nav1 = document.getElementById("nav1");
let menu = document.getElementById("menu");
menu.onclick = () => {
  nav1.classList.toggle('activ');
}
//       counter
function find() {
    d=document.getElementById('driver').value;
    l=document.getElementById('location').value;
    b=document.getElementById('brands').value;
    f=document.getElementById('fuel_type').value;
    p=document.getElementById('price').value;
    if (d==1) {
        redirect=`/CarWdriver/CarWdriver.html?price=${p}`;
    }else{
        redirect=`/shop/shop.html?price=${p}`;
    }
    redirect+= (l != 0) ? `&location=${l}` :'';
    redirect+= (b != 0) ? `&brand=${b}` :'';
    redirect+= (f != 0) ? `&fuel_type=${f}` :'';
    console.log(redirect);
 location.href=redirect;
}


 // Fetch data from the API
 fetch('http://127.0.0.1:8000/api/count')
 .then(response => response.json())
 .then(countData => {
    console.log(countData)
     // Update the HTML content with the retrieved data
     document.getElementById('counterContainer').innerHTML = `
         <div class="container">
             <img src="./img/icons/1.JPG" alt="">
             <span class="num" data-value="${countData.Cars}">${countData.Cars}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Available Cars</span>
         </div>
         <div class="container">
             <img src="./img/icons/2.JPG" alt="">
             <span class="num" data-value="${countData.Client}">${countData.Client}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Happy Clients</span>
         </div>
         <div class="container">
             <img src="./img/icons/3.JPG" alt="">
             <span class="num" data-value="${countData.CarWithDriver}">${countData.CarWithDriver}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Car with Drivers</span>
         </div>
         <div class="container">
             <img src="./img/icons/4.JPG" alt="">
             <span class="num" data-value="5">0</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Years of Experience</span>
         </div>
     `;
     let valueDisplays = document.querySelectorAll('.num');
let interval = 1000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-value'));

  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});
 })
 .catch(error => console.error('Error fetching count:', error));

 

document.addEventListener("DOMContentLoaded", function () {
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
});

fetch('http://127.0.0.1:8000/api/cars?withDriver=0')
    .then(response => response.json())
    .then(data => {
        // Limit the number of cars to display
        const carsToDisplay = data.slice(0, 4);

        // Populate the car container with fetched data
        populateCarContainer(carsToDisplay);
    })
    .catch(error => console.error('Error fetching data:', error));

function populateCarContainer(cars) {
    const carContainer = document.getElementById('carContainer');

    // Iterate through the cars and generate HTML for each card
    cars.forEach(car => {
        // Fetch the average rating for the current car
        fetch(`http://127.0.0.1:8000/api/Avg/${car.id}`)
            .then(response => response.json())
            .then(ratingData => {
                const averageRating = ratingData.length > 0 ? parseFloat(ratingData[0].average_rating) : 0;

                const carCard = document.createElement('div');
                carCard.classList.add('arr-col');

                carCard.innerHTML = `
                    <div class="img">
                        <img src="http://127.0.0.1:8000/car/img/${car.img}" alt="${car.brand} Car">
                    </div>
                    <h5>${car.brand} Car</h5>
                    <div class="rating">
                        <div class="stars">
                            ${getStarIcons(averageRating)}
                        </div>
                        <div class="review">
                            <span>${car.name}</span>
                        </div>
                    </div>
                    <div class="features">
                        <span><i class="fa-solid fa-location-dot"></i>${car.location}</span>
                        <span><i class="fa-solid fa-gear"></i>${car.gear}</span>
                        <span><i class="fa-solid fa-bolt"></i>${car.fuel_type}</span>
                        <span><i class="fa-solid fa-car"></i>Car</span>
                    </div>
                    <div class="price">
                        <p>${car.price_day}JD/Day</p>
                        <a href='/SingleCar/SingleCar.html#${car.id}'><button>Rent Now</button></a>
                    </div>
                `;

                carContainer.appendChild(carCard);
            })
            .catch(error => console.error('Error fetching average rating:', error));
    });
}

// Helper function to generate star icons or display "New" based on the average rating
function getStarIcons(averageRating) {
    if (averageRating === 0) {
        return 'New';
    }
  
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
  
    let starsHtml = '';
  
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
    }
  
    if (halfStar === 1) {
        starsHtml += '<i class="fa-solid fa-star-half"></i>';
    }
  
    return starsHtml !== '' ? starsHtml : 'New'; // Return 'New' if starsHtml is empty
  }


fetch('http://127.0.0.1:8000/api/cars?withDriver=1')
    .then(response => response.json())
    .then(data => {
        // Limit the number of cars to display
        const carsToDisplay = data.slice(0, 4);

        // Populate the car container with fetched data
        populateCarContainer1(carsToDisplay);
    })
    .catch(error => console.error('Error fetching data:', error));

function populateCarContainer1(cars) {
    const carContainer = document.getElementById('carContainer1');

    // Iterate through the cars and generate HTML for each card
    cars.forEach(car => {
        // Fetch the average rating for the current car
        fetch(`http://127.0.0.1:8000/api/Avg/${car.id}`)
            .then(response => response.json())
            .then(ratingData => {
                const averageRating = ratingData.length > 0 ? parseFloat(ratingData[0].average_rating) : 0;

                const carCard = document.createElement('div');
                carCard.classList.add('arr-col');

                carCard.innerHTML = `
                    <div class="img">
                        <img src="http://127.0.0.1:8000/car/img/${car.img}" alt="${car.brand} Car">
                    </div>
                    <h5>${car.brand} Car</h5>
                    <div class="rating">
                        <div class="stars">
                            ${getStarIcons1(averageRating)}
                        </div>
                        <div class="review">
                            <span>${car.name}</span>
                        </div>
                    </div>
                    <div class="features">
                        <span><i class="fa-solid fa-location-dot"></i>${car.location}</span>
                        <span><i class="fa-solid fa-gear"></i>${car.gear}</span>
                        <span><i class="fa-solid fa-bolt"></i>${car.fuel_type}</span>
                        <span><i class="fa-solid fa-car"></i>Car</span>
                    </div>
                    <div class="price">
                        <p>${car.price_day}JD/Day</p>
                        <a href='/SingleCar/SingleCar.html#${car.id}'><button>Rent Now</button></a>
                    </div>
                `;

                carContainer.appendChild(carCard);
            })
            .catch(error => console.error('Error fetching average rating:', error));
    });
}

// Helper function to generate star icons or display "New" based on the average rating
function getStarIcons1(averageRating) {
    if (averageRating === 0) {
        return 'New';
    }
  
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
  
    let starsHtml = '';
  
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
    }
  
    if (halfStar === 1) {
        starsHtml += '<i class="fa-solid fa-star-half"></i>';
    }
  
    return starsHtml !== '' ? starsHtml : 'New'; // Return 'New' if starsHtml is empty
  }

