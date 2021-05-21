const express = require("express");
const https = require('http');
const { dirname } = require("path");
const bodyParser = require("body-parser")


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    // res.send("Server is Up Running");
});

app.post("/",function(req,res){
    const place = req.body.cityName;
    const apiKey = "I Can't Put Here";
    const unit = "metric";
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid="+apiKey+"&q="+place+"&units="+unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp= weatherData.main.temp;
            const weatherName= weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<p>Weather in "+ place +"  "+ weatherName +"</p>");
            res.write("<h1>The Temp is "+place +" "+temp+"</h1>");
            res.write("<img src="+iconURL+">");
            res.send();
        })
    })

})

app.listen(3000,function(){
    console.log("Your Server 3000 is Start");
});
