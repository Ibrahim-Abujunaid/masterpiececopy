fetch('http://127.0.0.1:8000/api/count')
    .then(response => response.json())
    .then(countData => {
        console.log(countData)
        // Update the HTML content with the retrieved data
        document.getElementById('counterContainer').innerHTML = `
         <div class="container">
             <img src="../../../img/icons/1.JPG" alt="">
             <span class="num" data-value="${countData.Cars}">${countData.Cars}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Available Cars</span>
         </div>
         <div class="container">
             <img src="../../../img/icons/2.JPG" alt="">
             <span class="num" data-value="${countData.Client}">${countData.Client}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Happy Clients</span>
         </div>
         <div class="container">
             <img src="../../../img/icons/3.JPG" alt="">
             <span class="num" data-value="${countData.CarWithDriver}">${countData.CarWithDriver}</span>
             <span class="text"><i class="fa-solid fa-plus"></i>Car with Drivers</span>
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
                if (startValue >= endValue) {
                    clearInterval(counter);
                }
            }, duration);
        });
    })
    .catch(error => console.error('Error fetching count:', error));



// Fetch data from the API
// Fetch data from the API
fetch('http://127.0.0.1:8000/api/order_sum')
  .then(response => response.json())
  .then(data => {
    // Assuming xValues are the dates and yValues are the corresponding order_day values
    const xValues = Object.keys(data);
    const yValues = Object.values(data).map(dayData => {
      // Assuming each date has only one entry in the array
      return dayData.length > 0 ? dayData[0].order_day : null;
    });

    // Get the Chart.js instance
    const chartInstance = new Chart("myChart1", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "#d30d0d",
          borderColor: "#d30d0d",
          data: yValues
        }]
      },
      options: {
        legend: { display: false },
      }
    });

    // Update the chart
    chartInstance.update();
  })
  .catch(error => console.error('Error fetching data:', error));



const isLoggedIn = sessionStorage.getItem('isLoggedin');
let Logout = document.getElementById('Logout');
let Role = sessionStorage.getItem("roleId")
if (isLoggedIn === 'true' && Role == 1) {
    // Change text and behavior for logged-in users
    Logout.textContent = 'Log out';

    Logout.addEventListener('click', (e) => {
        // Log out logic
        window.location.href = '../../../index.html';
        sessionStorage.clear();
    });
} else {
    window.location.href = '../../../login/login.html';
}