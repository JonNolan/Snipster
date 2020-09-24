const http = require('http');
const fs = require('fs');
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const app = new express();

const dbInfo = {
  host: "localhost",
  user: "root",
  password: "",
  database: "SnippetsDB"
};

const sessionOptions = {
  secret: "Yoyoyoyo",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
};

app.use(session(sessionOptions));
app.use(express.static('public'))
app.all("/", serveIndex);
app.get("/snippets", findSnippets);

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

/// APP FUNCTIONS ///
function writeResult(res, object) {
  res.writeHead(200, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(object));
}

function buildSnippet(dbObject) {
  return {Id: dbObject.Id,
          Creator: dbObject.Creator,
          Language: dbObject.Lang,
          Description: dbObject.Description,
          Snippet: dbObject.Code};
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
      let snippets = dbResult.map(function(snippet) {return buildSnippet(snippet)});
      writeResult(res, {result: snippets});
    }
  });
}