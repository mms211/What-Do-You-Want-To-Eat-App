//Global Variables

var apiKey = "apiKey=e62ae879a14347278adb83fabc36f7a1&ip=" 

var ipAddress = localStorage.address

var getLocation = "https://api.ipgeolocation.io/ipgeo?" + apiKey + ipAddress 

var lat = localStorage.latitude

var lon = localStorage.longitude

var cuisines = "1"




//Retrieve IP Address
$(function getIP() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        console.log(json.ip) ;
        localStorage.address = (json.ip)
      }
    );
  });

//Getting coordinates based on IP
$.ajax({
      url: getLocation,
      method: "GET",
      dataType: 'JSON',
    })

.then(function(response){
    
    console.log(response.latitude)
  
    localStorage.latitude = response.latitude
    localStorage.longitude = response.longitude

});





function generateAPI() {
  
  $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(response) {
        response.setRequestHeader('user-key', '736fc2557bb7bf4c8f77bc93b98b55f0');
      },
      url: "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&cuisines=" + cuisines,
      success: function(response) {
      console.log(response)
      console.log (response.restaurants[Math.floor(Math.random()*19)]);
      var res = response.restaurants[Math.floor(Math.random()*19)]
      var data = {}
      data.name = res.restaurant.name
      data.location = res.restaurant.location.address
      data.avgCost = res.restaurant.average_cost_for_two
      data.number = res.restaurant.phone_numbers


      displayRes(data)
      
      
  },
  error: function(response) {
      alert("City Name Valid")
    }
});
}

generateAPI()


function displayRes(data) {
 var infoHold = $("#ul")

  for (let x in data) {
    let li = $("<li>");
    li.text(data[x])
    infoHold.append(li)
  }
}

