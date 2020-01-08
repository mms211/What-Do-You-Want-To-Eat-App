//Global Variables
$(document).ready(function() {
  
  var cuisines = "none";
  
  $(".btn").click(function() {
      cuisines = $(this).attr("value");
  });
   $(".btn").click(function() {

    localStorage.value = cuisines

  });


var apiKey = "apiKey=e62ae879a14347278adb83fabc36f7a1&ip=" 

var ipAddress = localStorage.address

var getLocation = "https://api.ipgeolocation.io/ipgeo?" + apiKey + ipAddress 

var lat = localStorage.latitude

var lon = localStorage.longitude

var cuisines = localStorage.value

var searchButton = $("#srchBtn")

console.log(cuisines)
//Retrieve IP Address
$(function getIP() {
    $.getJSON("https://api6.ipify.org?format=jsonp&callback=?",
      function(json) {
        console.log(json.ip) ;
        console.log(json)
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
    console.log(response.longitude)
    localStorage.latitude = response.latitude
    localStorage.longitude = response.longitude

});


(searchButton).on("click", function generateAPI() {
  var cuisines = localStorage.value
  $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(response) {
        response.setRequestHeader('user-key', '736fc2557bb7bf4c8f77bc93b98b55f0');
      },
      url: "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + lon + "&cuisines=" + cuisines,
      success: function(response) {
      var res = response.restaurants[Math.floor(Math.random()*19)]
      var data = {}
      console.log(res)
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
});


function displayRes(data) {
    $("#name").html(data.name)
    $("#address").html( "Address: " + data.location)
    $("#address").attr("href", "https://www.google.com/search?q=" + data.location + " " + data.name)
    $("#avgCost").html(data.avgCost)
    $("#number").html(data.number)
}



// Button Variables
var choseChinese = $("#25").text()
var choseItalian = $("#55").text()
var choseMexican = $("#73").text()
var choseThai = $("#95").text()
var choseAmerican = $("#1").text()

$("#25").on('click', function(){
  $(".dropbtn").html(choseChinese)
})

$("#55").on('click', function(){
  $(".dropbtn").html(choseItalian)
})

$("#73").on('click', function(){
  $(".dropbtn").html(choseMexican)
})

$("#95").on('click', function(){
  $(".dropbtn").html(choseThai)
})

$("#1").on('click', function(){
  $(".dropbtn").html(choseAmerican)
})



//Hide DropDown
$(".btn").on('click', function(){
  $("#optionList").css("display", "none")
})

//Show Dropdown
$(".dropbtn").on('click', function(){
  $("#optionList").css("display", "block")
})


}); 
