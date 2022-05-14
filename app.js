const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const appID = "APP_ID";
var imageURL = "http://openweathermap.org/img/wn/";

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html");
})
app.post("/", function(req, res) {
  var cityQuery = req.body.city;
  var systemUnit = req.body.systemUnit;
  var weatherData = "https://api.openweathermap.org/data/2.5/weather?q="+cityQuery+"&appid=" + appID + "&units="+systemUnit;

  https.get(weatherData, function(response) {
    response.on("data", function(d) {
      const jsonObj = JSON.parse(d);
      var city = jsonObj.name;
      var temperature = jsonObj.main.temp;
      var condition = jsonObj.weather[0].main;
      var iconData = jsonObj.weather[0].icon;
      res.write("<h1>The temperature in " + city + " is " + temperature + " ℃ </h1>");
      res.write("<h1>It has a " + condition + " atmosphere.</h1>");
      res.write("<img src=" + imageURL + iconData + "@2x.png>");
      res.send();
    });
  });
})
app.listen(3000, function() {
  console.log("server at 3000 started");
});
