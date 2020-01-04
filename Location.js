var apiKey = "apiKey=e62ae879a14347278adb83fabc36f7a1&ip=" 

var ipAddress = localStorage.address

var getLocation = "https://api.ipgeolocation.io/ipgeo?" + apiKey + ipAddress 


$(function getIP() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        console.log(json.ip) ;
        localStorage.address = (json.ip)
      }
    );
  });


$.ajax({
      url: getLocation,
      method: "GET",
      dataType: 'JSON',
    })

.then(function(response){
    console.log("Latitude: " + response.latitude)
    console.log("Longitude: " + response.longitude)


});
