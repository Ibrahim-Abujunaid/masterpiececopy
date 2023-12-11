// nav bar toggle
let nav1=document.getElementById("nav1");
let menu =document.getElementById("menu");
menu.onclick=()=>{
        nav1.classList.toggle('activ');
}
let url = 'http://127.0.0.1:8000/api/cars?withDriver=1';

function mainFetch() {
  let shop = document.getElementById('shop');
  shop.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(car => {
        // Fetch the average rating for the current car
        fetch(`http://127.0.0.1:8000/api/Avg/${car.id}`)
          .then(response => response.json())
          .then(ratingData => {
            const averageRating = ratingData.length > 0 ? parseFloat(ratingData[0].average_rating) : 0;

            // Append the car details and average rating to the shop container
            shop.innerHTML += `
                                <div class="arr-col">
                                    <div class="img">
                                        <img src="http://127.0.0.1:8000/car/img/${car.img}" alt="">
                                    </div>
                                    <h5>${car.brand}</h5>
                                    <div class="rating">
                                        <div class="stars">
                                            ${getStarIcons(averageRating)}
                                        </div>
                                        <div class="review">
                                            <span>${car.name}</span>
                                        </div>
                                    </div>
                                    <div class="features">
                                        <span><i class="fa-solid fa-circle-exclamation"></i>${car.gear}</span>
                                        <span><i class="fa-solid fa-location-dot"></i>${car.location}</span>
                                        <span><i class="fa-solid fa-location-crosshairs"></i>${car.fuel_type}</span>
                                        <span><i class="fa-solid fa-car"></i>With Driver</span>
                                    </div>
                                    <div class="price">
                                        <p>${car.price_day}JD/Day</p>
                                        <a href="../SingleCar/SingleCar.html#${car.id}"><button>Rent Now</button></a>
                                    </div>
                                </div>
                            `;
          })
          .catch(error => console.error('Error fetching average rating:', error));
      });
    })
    .catch(error => console.error('Error fetching cars:', error));
}

// Helper function to generate star icons based on the average rating
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

function val(){
  let order = document.querySelector('#order_by').value;
  console.log(order);
  url+=`&order_by=${order}`;
  mainFetch();
}
function ge(){
    const gearIds = [...document.querySelectorAll('input[name="gear"]:checked')] .map(checkBox => checkBox.value);
  const urlParams = new URLSearchParams(url);
  const existingBrandIds = urlParams.getAll('gear[]');


  const uncheckedBrands = existingBrandIds.filter(gearId => !gearIds.includes(gearId));
      console.log();
        // Remove the unchecked brands from the URL
  uncheckedBrands.forEach(gearId => {
      url = url.replace(`&gear[]=${gearId}`, '');
    });
    gearIds.forEach(element => {

          url+=`&gear[]=${element}`;
          console.log(url)
      });
    mainFetch();

}
function fuel(){
    const fuelIds = [...document.querySelectorAll('input[name="fuel_type"]:checked')]
      .map(checkBox => checkBox.value);

  // Get the existing brand IDs from the URL
  const urlParams = new URLSearchParams(url);
  const existingBrandIds = urlParams.getAll('fuel_type[]');

  // Identify the unchecked brands
  const uncheckedBrands = existingBrandIds.filter(brandId => !fuelIds.includes(brandId));

  // Remove the unchecked brands from the URL
  uncheckedBrands.forEach(brandId => {
    url = url.replace(`&fuel_type[]=${brandId}`, '');
  });
      console.log(fuelIds);
    if (fuelIds.length > 0) {
        fuelIds.forEach(element => {
          console.log(element)
          url+=`&fuel_type[]=${element}`;
          console.log(url)
      });
    }
    mainFetch();

}

function br() {
    
    const newBrandIds = [...document.querySelectorAll('input[name="brand"]:checked')]
    .map(checkBox => checkBox.value);

  // Get the existing brand IDs from the URL
  const urlParams = new URLSearchParams(url);
  const existingBrandIds = urlParams.getAll('brands[]');

  // Identify the unchecked brands
  const uncheckedBrands = existingBrandIds.filter(brandId => !newBrandIds.includes(brandId));

  // Remove the unchecked brands from the URL
  uncheckedBrands.forEach(brandId => {
    url = url.replace(`&brands[]=${brandId}`, '');
  });

  // Add the newly selected brands to the URL
  if (newBrandIds.length > 0) {
    newBrandIds.forEach(element => {
          console.log(element)
          url+=`&brands[]=${element}`;
      });
    console.log(url)
    
  }

  mainFetch();
}
//    const brandIds = [...document.querySelectorAll('input[name="brand"]:checked')]
//       .map(checkBox => checkBox.value);

function loc() {
    
  const locIds = [...document.querySelectorAll('input[name="location"]:checked')]
    .map(checkBox => checkBox.value);

    
  // Get the existing brand IDs from the URL
  const urlParams = new URLSearchParams(url);
  const existingBrandIds = urlParams.getAll('locations[]');

  // Identify the unchecked brands
  const uncheckedBrands = existingBrandIds.filter(brandId => !locIds.includes(brandId));

  // Remove the unchecked brands from the URL
  uncheckedBrands.forEach(brandId => {
    url = url.replace(`&locations[]=${brandId}`, '');
  });

    console.log(locIds);
  if (locIds.length > 0) {
    locIds.forEach(element => {
        console.log(element)
        url+=`&locations[]=${element}`;
    });
  }
  mainFetch();
}

document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);

  const loc= searchParams.get('location');
  const br= searchParams.get('brand');
  const pr= searchParams.get('price');
  const fu= searchParams.get('fuel_type');

  url+=(!loc) ? '':`&locations[]=${loc}` ;
  url+=(!br) ? '':'&brands[]='+br;
  url+=(!pr) ? '':'&price='+pr;
  url+=(!fu) ? '':'&fuel_type[]='+fu;


    mainFetch();
        
    // Get the select elements
        var selectBrands = document.getElementById("brands");
        var selectLocation = document.getElementById("location");
    
        // Fetch brands data from the API
        fetch('http://127.0.0.1:8000/api/brands/')
            .then(response => response.json())
            .then(data => {
                // Populate brands select
                data.forEach(item => {   
                    selectBrands.innerHTML+= `<input type="checkbox" name="brand" value="${item.id}" oninput="br()">${item.name} <br>` 
                });
            })
            .catch(error => console.error('Error fetching brands data:', error));
    
        // Fetch locations data from the API
        fetch('http://127.0.0.1:8000/api/locations/')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    selectLocation.innerHTML+= `<input type="checkbox" name="location" value="${item.id}" onchange="loc()">${item.name} <br>` 

                });
            })
            .catch(error => console.error('Error fetching locations data:', error));
    });