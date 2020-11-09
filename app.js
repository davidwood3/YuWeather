// jshint esversion:6

const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=312f190d88660f2eba48a6db7dd00742";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently: " + weatherDescription + "</p>");
      res.write("<h1>The temperature in London is: " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
  
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});