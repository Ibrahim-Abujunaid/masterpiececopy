 // Fetch data from the API
 fetch('http://127.0.0.1:8000/api/count')
 .then(response => response.json())
 .then(jsonData => {
     // Extracting data from JSON
     var xValues = Object.keys(jsonData);
     var yValues = Object.values(jsonData);
     var barColors = ["red", "green", "blue"];

     // Create a bar chart using Chart.js
     new Chart("myChart", {
         type: "bar",
         data: {
             labels: xValues,
             datasets: [{
                 backgroundColor: barColors,
                 data: yValues
             }]
         },
         options: {
             legend: { display: false },
             title: {
                 display: true,
                 text: "Dynamic Bar Chart"
             }
         }
     });
 })
 .catch(error => console.error('Error fetching data:', error));


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