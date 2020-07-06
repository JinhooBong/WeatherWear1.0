const express = require("express");
const https = require("https"); // a native node module
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName
    const appid = "452bcd2ca7a0d4d440a64fea34d1c4ba";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            // console.log(temp);
            const description = weatherData.weather[0].description;
            // console.log(description);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Farenheit</h1>");
            res.write("<p>The weather is currently " + description + ".</p><br>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    });
});





app.listen(3000, function() {
    console.log("Server is running on port 3000");
});