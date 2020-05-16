//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey= "0e4fa4ffc39bed87edc08c658263a880";
  const unit = "metric"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + unit ;

  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp
      const weatherDescription = weatherdata.weather[0].description
      res.write("<p>The weather is currently " + weatherDescription +"<p>");
      res.write("<h1>The temprature in " + query + " is " + temp + " Degree Celcius</h1>");
      res.send()
    })
  })
})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
