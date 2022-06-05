const express = require("express");
const https = require("https");
const app = express();
app.get("/", function (req, res) {
    //Please replace {your_api_id} below with your own api id from Open Weather
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chengannur&appid={your_api_id}&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDes = weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temperature in Chengannur is " + temp + " degree Celsius</h1>");
            res.write("<h2>The weather is currently  " + weatherDes + "<h2>");
            res.write("<img src="+imageURL+">");
            res.send()
        })
    })
});
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
