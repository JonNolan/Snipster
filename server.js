const fs = require("fs");
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

const usernameRegex = /^(?=[a-zA-Z0-9_\d]*[a-zA-Z])[a-zA-Z0-9_\d]{3,}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.[A-Za-z0-9])(?=.*)[A-Za-z0-9]{8,}$/;
//const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

app.use(express.static("public"))
app.use(session(sessionOptions));
app.all("/", serveIndex);
app.get("/snippets", findSnippets);
app.get("/register", register);
app.get("/login", login);

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
  res.writeHead(200, {"Content-Type": "text/html"});
  var index = fs.readFileSync("index.html");
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
  let sql = "SELECT * FROM Snippets";
  let queryString = [];
  queryString.push(sql);
  if(req.query.filterOn && req.query.filter) {
    queryString.push(" WHERE " + req.query.filterOn + " LIKE \'%" + req.query.filter + "%\'");
  }
  if(req.query.sortOn && req.query.order) {
    queryString.push(" ORDER BY " + req.query.sortOn + " " + req.query.order);
  }
  executeQuery(queryString, res);
  console.log(requesterIP + " is requesting snippets.");
}

function register(req, res){
  if (req.query.username == undefined || !validateUsername(req.query.username)) {
    writeResult(res, {"error" : "Please enter a username! (only letters and numbers and (_) are allowed. Minimum of 3 characters. Must contain a letter."});
    return;
  }
  if (req.query.email == undefined || !validateEmail(req.query.email)) {
    writeResult(res, {"error" : "Please enter a valid email!"});
    return;
  }
  if (req.query.password == undefined || !validatePassword(req.query.password)) {
    writeResult(res, {"error" : "Please enter a valid password! (must be at least eight characters long and may contain letters and/or numbers)"});
    return;
  }
  let hash = bcryptjs.hashSync(req.query.password, 12);
  connection.query("INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)", [req.query.username, req.query.email, hash], function (err, result, fields){
    if (err) {
      if (err.code == "ER_DUP_ENTRY")
        err = "User account already exists. Try a different username and/or email address.";
      writeResult(res, {"error" : err});
      return;
    }
    else {
      writeResult(res, {"Success" : "User added."});
      console.log("User added.");
    }
  });
}

function login(req, res) {
  if(!req.query.username || !req.query.password) {
    writeResult(res, {error: "Please enter a username and a password."});
    return;
  }
  console.log(req.query.username);
  console.log(req.query.password);
  console.log("trying to login");
  connection.query("SELECT Id, Username, Email, Password FROM Users WHERE Username = ?", [req.query.username], function(err, dbResult) {
    if(err)
      writeResult(res, {error: err.message});
    else {
      let result = {};
      if(dbResult.length == 1 && bcryptjs.compareSync(req.query.password, dbResult[0].Password)) {
        req.session.user = {id: dbResult[0].Id, username: dbResult[0].Username};
        result = {user: req.session.user};
        console.log(dbResult[0].Username + " logged in.");
      }
      else {
        result = {error: "Username or password is incorrect."};
      }
      writeResult(res, {result: result});
    }
  });
}

function validateUsername(username) {
  if (!username) {
    return false;
  }
  return usernameRegex.test(username.toLowerCase());
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

function executeQuery(req, res) {
  let queryStr = "";
  for (let i = 0; i < req.length; i++) {
    queryStr += req[i];
  }
  queryStr.replace(",", "");
  connection.query(queryStr + ";", function (err, dbResult) {
    if (err) {
      writeResult(res, {"error" : "error @ executeQuery"});
      return;
    }
    else {
      console.log("Query: " + queryStr);
      let snippets = dbResult.map(function(snippet) {
        return buildSnippet(snippet);
      });
      writeResult(res, {result: snippets});
      return;
    }
  });
}
