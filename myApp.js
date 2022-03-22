var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: false}))


app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
})


app.get("/json", (req, res) => {
  var response = "Hello json";
  const mySecret = process.env['MESSAGE_STYLE']
  if(mySecret == "uppercase")
  {
    res.json({ "message": response.toUpperCase() })
  }
  else {
    res.json({ "message": response })
  }
  
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time})
})

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word})
})

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
})
app.get("/name", (req, res) => {
  var { first: firstName, last: lastName } = req.query;
  res.json({name: `${firstName} ${lastName}`})
})


































module.exports = app;
