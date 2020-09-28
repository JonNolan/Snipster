const fs = require('fs');
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const bcryptjs = require("bcryptjs");
const app = new express();

const dbInfo = {
  host: "localhost",
  user: "root",
  password: "",
  database: "SnippetsDB"
};

const sessionOptions = {
  secret: "Yoyoyo",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

app.use(express.static('public'))
app.use(session(sessionOptions));
app.all("/", serveIndex);
app.get("/snippets", findSnippets);
app.get("/register", register);

app.listen(3000, process.env.IP, startHandler());

const connection = mysql.createConnection(dbInfo);
connection.connect(function(err) {
  if(err) throw err;
});

function startHandler() {
  console.log("\x1b[31m", "\n         Snip This.");
  console.log("\x1b[37m","\x1b[41m","    ̿' ̿'\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿     ","\x1b[0m");
  console.log("\n   Waiting for a request...\n")
}

function serveIndex(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.readFileSync('index.html');
  res.end(index);
}

// APP FUNCTIONS
function writeResult(res, object) {
  res.writeHead(200, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(object));
}

function buildSnippet(dbObject) {
  return {
    Id: dbObject.Id,
    Creator: dbObject.Creator,
    Language: dbObject.Lang,
    Description: dbObject.Description,
    Snippet: dbObject.Code
  };
}

function findSnippets(req, res) {
  let requesterIP = req.ip;
  let sql= "SELECT * FROM Snippets";
  let queryString = [];
  queryString.push(sql);
  console.log(requesterIP + " is making a query.");
  if(req.query.filterOn && !req.query.sortOn){
    queryString.push(" WHERE " + req.query.filterOn + " LIKE \'%" + req.query.filter + "%\'");
    makeQuery(queryString, res);
  }
  else if(req.query.sortOn && !req.query.filterOn){
    queryString.push(" ORDER BY " + req.query.sortOn + " " + req.query.order);
    makeQuery(queryString, res);
  }
  else if(req.query.sortOn && req.query.filterOn){
    queryString.push(" WHERE " + req.query.filterOn + " LIKE \'%" + req.query.filter +"%\'");
    queryString.push(" ORDER BY " + req.query.sortOn + " " + req.query.order);
    makeQuery(queryString, res);
  }
  else {
    makeQuery(queryString, res);
  }
}

function register(req, res){
  if(req.query.email == undefined || !validateEmail(req.query.email))
    writeResult(res, {'error' : 'Please enter a valid email!'});
  if(req.query.password == undefined || !validatePassword(req.query.password))
    writeResult(res, {'error' : 'Please enter a password!'});
  connection.connect(function(err){
    if(err)
      writeResult(res, {'error' : err});
    else {
      let hash = bcryptjs.hashSync(req.query.password, 12);
      connection.query("INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)", [req.query.firstname, req.query.lastname, req.query.email, hash], function (err, result, fields){
        if (err){
          if (err.code == "ER_DUP_ENTRY")
            err = "User account already exists.";
          writeResult(req, res, {'error' : err});
        }
      });
    }
  });
}

function validateEmail(email) {
  if(!email)
    return false;
  return emailRegex.test(email.toLowerCase());
}

function validatePassword(password) {
  if(!password)
    return false;
  return passwordRegex.test(password);
}

function makeQuery(req, res) {
  let queryStr = "";
  for (let i = 0; i < req.length; i++) {
    queryStr += req[i];
  }
  queryStr.replace(",", "");
  connection.query(queryStr + ";", function (err, dbResult) {
    if (err)
      writeResult(res, {'error' : "error @ makeQuery"})
    else {
      console.log("Query: " + queryStr);
      let snippets = dbResult.map(function(snippet) {
        return buildSnippet(snippet)
      });
      writeResult(res, {result: snippets});
    }
  });
}
