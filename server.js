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
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

app.use(express.static("public"));
app.use(session(sessionOptions));
app.all("/", serveIndex);
app.get("/snippets", findSnippets);
app.get("/addSnippet", addSnippet);
app.get("/deleteSnippet", deleteSnippet);
app.get("/register", register);
app.get("/login", login);
app.get("/logout", logout);
app.get("/who", whoIsLoggedIn);
app.get("/getQuestions", getQuestions);
app.get("/verifyQuestions", verifyQuestions);
app.get("/getLanguages", getLanguages);

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

function whoIsLoggedIn(req, res) {
  let result = {};
  if (req.session.user == undefined) {
    result = {noUser : "Register or login!"};
  }
  else {
    result = {user : req.session.user};
  }
  writeResult(res, {result: result});
}

function buildSnippet(dbObject) {
  return {
    Id: dbObject.Id,
    Creator: dbObject.Username,
    Email: dbObject.Email,
    Language: dbObject.Language,
    Description: dbObject.Description,
    Snippet: dbObject.Code
  };
}

function findSnippets(req, res) {
  let requesterIP = req.ip;
  let sql = "SELECT Snippets.Id, Snippets.Description, Snippets.Code, Languages.Language, Users.Username, Users.Email FROM Snippets, Languages, Users WHERE Snippets.UserId = Users.Id AND Snippets.LangId = Languages.Id"
  let queryString = [];
  queryString.push(sql);
  if(req.query.filterOn && req.query.filter) {
    if (req.query.filterOn == "Creator") {
      queryString.push(" AND (Users.Email LIKE \'%" + req.query.filter + "%\' OR Users.Username LIKE \'%" + req.query.filter + "%\')");
    } else {
      queryString.push(" AND " + req.query.filterOn + " LIKE \'%" + req.query.filter + "%\'");
    }
  }
  if(req.query.sortOn && req.query.order) {
    if (req.query.sortOn == "Creator") {
      queryString.push(" ORDER BY Users.Username " + req.query.order);
    } else {
      queryString.push(" ORDER BY " + req.query.sortOn + " " + req.query.order);
    }
  } else {
    queryString.push(" ORDER BY Snippets.Id ASC");
  }
  executeQuery(queryString, res);
  console.log(requesterIP + " is requesting snippets.");
}

function addSnippet(req, res) {
  if (req.session.user == undefined) {
    writeResult(res, {"error1" : "Please sign in to add a Snippet."});
    return;
  }
  if (req.query.newLang < 1) {
    writeResult(res, {"error2" : "Please enter a language for the Snippet."});
    return;
  }
  if (req.query.newDesc < 1) {
    writeResult(res, {"error3" : "Please enter a description for the Snippet."});
    return;
  }
  if (req.query.newCode < 1) {
    writeResult(res, {"error4" : "Please enter the code for the Snippet."});
    return;
  }
  let user = req.session.user.username;
  let userId = req.session.user.id;
  let desc = req.query.newDesc;
  let code = req.query.newCode;
  let langId = req.query.newLang;
  let snippetId = req.query.snippetId;
  if (snippetId == "none") {
    connection.query("INSERT INTO Snippets (Description, Code, LangId, UserId) VALUES (?, ?, ?, ?)", [desc, code, langId, userId], function(err, result, fields) {
      if (err) {
        writeResult(res, {"error": err});
      }
      else {
        writeResult(res, {"Success": "Snippet Added"});
        console.log(user + " created a Snippet!");
      }
    });
  }
  else if (!isNaN(snippetId)) {
    connection.query("UPDATE Snippets SET Description = ?, Code = ?, LangId = ? WHERE Id = ?", [desc, code, langId, snippetId], function(err, result, fields) {
      if (err)
        writeResult(res, {"error": err});
      else {
        writeResult(res, {"Success": "Snippet Edited"});
        console.log("Updating Snippet");
      }
    });
  }
}

function deleteSnippet(req, res) {
  let snippetId = req.query.snippetId;
  connection.query("DELETE FROM Snippets WHERE Id = ?", [snippetId], function(err, result)
  {
    if(err)
      writeResult(res, {"error": err});
    else {
      writeResult(res, {"Success": "Snippet Deleted"});
      console.log("Deleting Snippet");
    }
  });
}

function register(req, res) {
  if (req.query.username == undefined || !validateUsername(req.query.username)) {
    writeResult(res, {"error" : "Please enter a username! (only letters and numbers and (_) are allowed. Minimum of 3 characters. Must contain a letter."});
    return;
  }
  if (req.query.email == undefined || !validateEmail(req.query.email)) {
    writeResult(res, {"error" : "Please enter a valid email!"});
    return;
  }
  if (req.query.password == undefined || !validatePassword(req.query.password)) {
    writeResult(res, {"error" : "Please enter a valid password! (must be at least eight characters long and must contain an uppercase letter, a lowercase letter, and a number)"});
    return;
  }
  if (req.query.question1 != 1 && req.query.question1 != 2 && req.query.question1 != 3 && req.query.question1 != 4 && req.query.question1 != 5) {
    console.log(req.query.question1Ans)
    console.log(req.query.question1);
    writeResult(res, {"error" : "Please select the first security question."});
    return;
  }
  if (req.query.question1Ans.length < 1) {
    writeResult(res, {"error" : "Please enter an answer for the first security question."});
    return;
  }
  if (req.query.question2 != 1 && req.query.question2 != 2 && req.query.question2 != 3 && req.query.question2 != 4 && req.query.question2 != 5) {
    writeResult(res, {"error" : "Please select the second security question."});
    return;
  }
  if (req.query.question2Ans.length < 1) {
    writeResult(res, {"error" : "Please enter an answer for the first security question."});
    return;
  }
  if (req.query.question1 == req.query.question2) {
    writeResult(res, {"error" : "Please select 2 different security questions."});
    return;
  }
  let hash = bcryptjs.hashSync(req.query.password, 12);
  let ans1Hash = bcryptjs.hashSync(req.query.question1Ans, 12);
  let ans2Hash = bcryptjs.hashSync(req.query.question2Ans, 12);
  connection.query("INSERT INTO Users (Username, Email, Password, Question1Id, Question1Ans, Question2Id, Question2Ans) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.query.username, req.query.email, hash, req.query.question1, ans1Hash, req.query.question2, ans2Hash], function (err, result, fields) {
    console.log(req.query.username + " is trying to register")
    if (err) {
      if (err.code == "ER_DUP_ENTRY")
        err = "User account already exists. Try a different username and/or email address.";
      writeResult(res, {error : err});
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
  console.log(req.query.username + " is trying to login");
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

function getQuestions(req, res) {
  let email = req.query.email;
  let result = {};
  let errorMessage = "";
  connection.query("SELECT Username, Questions1.Id AS Id1, Questions1.Question AS Question1, Questions2.Id AS Id2, Questions2.Question AS Question2 FROM Users JOIN Questions Questions1 on Question1Id = Questions1.Id  JOIN Questions Questions2 on Question2Id = Questions2.Id WHERE Email = ?", [email], function(err, dbResult) {
    if(err) {
      writeResult(res, {error: err.message});
    } else {
      console.log("someone is trying to reset their password.");
      if (dbResult.length == 0) {
        errorMessage = "There are no users associated with that email address.";
        result = {error: errorMessage};
      } else {
        result = {user : dbResult[0].Username, question1Id : dbResult[0].Id1, question1 : dbResult[0].Question1, question2Id : dbResult[0].Id2, question2: dbResult[0].Question2}
        console.log("Got user and questions of someone.");
      }
      writeResult(res, {result: result});
    }
  });
}

function verifyQuestions(req, res) {
  if (req.query.question1Ans.length < 1) {
    writeResult(res, {result: {"error" : "Please enter an answer to the first question."}});
    return;
  }
  if (req.query.question2Ans.length < 1) {
    writeResult(res, {result: {"error" : "Please enter an answer to the second question."}});
    return;
  }
  if (req.query.password.length < 1 || !validatePassword(req.query.password)) {
    writeResult(res, {result: {"error" : "Please enter a valid password! (must be at least eight characters long and must contain an uppercase letter, a lowercase letter, and a number)"}});
    return;
  }
  if (req.query.passwordCheck.length < 1) {
    writeResult(res, {result: {"error" : "Please re-enter the password."}});
    return;
  }
  if (req.query.password != req.query.passwordCheck) {
    writeResult(res, {result: {"error" : "The passwords do not match."}});
    return;
  }
  let user = req.query.username;
  let ans1 = req.query.question1Ans;
  let ans2 = req.query.question2Ans;
  let hash = bcryptjs.hashSync(req.query.password, 12);
  let result = {};
  console.log(user + " is trying to verify the answers to their questions.");
  connection.query("SELECT Question1Ans, Question2Ans FROM Users WHERE Username = ?", [user], function(err, dbResult) {
    if(err)
      writeResult(res, {error: err.message});
    else {
      if (bcryptjs.compareSync(ans1, dbResult[0].Question1Ans) && bcryptjs.compareSync(ans2, dbResult[0].Question2Ans)) {
        connection.query("UPDATE Users SET Password = '" + hash + "' WHERE Username =  '" + user + "'", function(err) {
          if(err) {
            result = {error: err.message};
            console.log(err.message);
            writeResult(res, {result: result});
          } else {
            result = {success : "Password changed!"};
            console.log("Answers verified and password changed for : " + user);
            writeResult(res, {result: result});
          }
        });
      } else {
        result = {error: "Your answers did not match what is on file."};
        writeResult(res, {result: result});
      }
    }
  });
}

function getLanguages(req, res) {
  connection.query("SELECT Language FROM Languages", function(err, dbResult) {
    if(err)
      writeResult(res, {error: err.message});
    else {
      console.log("Getting languages.");
      writeResult(res, {result: dbResult});
    }
  });
}

function logout(req, res) {
  console.log(req.session.user.username + " is trying to log out.");
  let user = req.session.user.username;
  let userMessage = user + " has logged out.";
  req.session.user = undefined;
  console.log(userMessage);
  writeResult(res, {message: userMessage});
}

function validateUsername(username) {
  if (!username) {
    return false;
  }
  return usernameRegex.test(username.toLowerCase());
}

function validateEmail(email) {
  if(!email) {
    return false;
  }
  return emailRegex.test(email.toLowerCase());
}

function validatePassword(password) {
  if(!password) {
    return false;
  }
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
