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
app.use(express.static('public'));

app.all("/", serveIndex);
app.get("/snippets", getAndListSnippets);
app.get("/filterSnippets", filterSnippets);
app.get("/sortByCreator", sortSnippetsByCreator);
app.get("/sortByLanguage", sortSnippetsByLanguage);
app.get("/sortByDescription", sortSnippetsByDescription);
app.listen(3000, process.env.IP, startHandler());

const connection = mysql.createConnection(dbInfo);
connection.connect(function(err) {
  if(err) throw err;
});

function startHandler() {
  console.log("Server listening at http://localhost:3000")
  console.log("\x1b[31m", " FUNCTION JUNCTION is Aware");
  console.log("\x1b[37m","\x1b[41m","    ̿' ̿'\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿     ","\x1b[0m");
}

function serveIndex(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.readFileSync('index.html');
  res.end(index);
}

/// APP FUNCTIONS BELOW
function writeResult(res, object) {
  res.writeHead(200, {"Content-Type" : "application/json"});
  res.end(JSON.stringify(object));
}

/// Initial Page Load
function buildSnippet(dbObject) {
  return {Id: dbObject.Id,
          Creator: dbObject.Creator,
          Language: dbObject.Lang,
          Description: dbObject.Description,
          Snippet: dbObject.Code};
}

function getAndListSnippets(req, res) {
  connection.query("SELECT * FROM Snippets;", function(err, dbResult) {
    if(err)
      writeResult(res, {error: err.message});
    else {
      let snippets = dbResult.map(function(snippet) {return buildSnippet(snippet)});
      writeResult(res, {result: snippets});
    }
  });
}

// Filtering
function filterSnippets(req, res) {
  if (req.query.filter == undefined)
    writeResult(res, {"error" : "Need to enter a filter!"});
  let filter = "%" + req.query.filter + "%";
  console.log(filter);
  connection.query("SELECT * FROM Snippets WHERE Creator LIKE ? OR Lang LIKE ? OR Description LIKE ? OR Code LIKE ?", [filter, filter, filter, filter], function(err, dbResult) {
    if(err)
    writeResult(res, {error: err.message});
    else {
      let snippets = dbResult.map(function(snippet) {return buildSnippet(snippet);});
      console.log(snippets);
      writeResult(res, {result: snippets});
    }
  });
}
// Sorting
function sortSnippetsByCreator(req, res) {
  connection.query("SELECT * FROM Snippets ORDER BY Creator", function(err, dbResult){
    if(err)
      writeResult(res, {error : err.message});
    else {
      let snippets = dbResult.map(function(snippet) {return buildSnippet(snippet)});
      writeResult(res, {result : snippets});
    }
  });
}

function sortSnippetsByLanguage(req, res) {
  connection.query("SELECT * FROM Snippets ORDER BY Lang", function(err, dbResult){
    if(err)
      writeResult(res, {error : err.message})
    else {
      let snippets = dbResult.map(function(snippet) {return buildSnippet(snippet)});
      writeResult(res, {result : snippets});
    }
  });
}

function sortSnippetsByDescription(req, res) {
  connection.query("SELECT * FROM Snippets ORDER BY Description ASC", function(err, dbResult){
    if(err)
      writeResult(res, {error : err.message})
    else {
      let snippets = dbResult.map(function(snippet) {return buildSnippet(snippet)});
      writeResult(res, {result : snippets});
    }
  });
}
