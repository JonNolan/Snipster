DROP DATABASE IF EXISTS SnippetsDB;

CREATE DATABASE SnippetsDB;

USE SnippetsDB;

CREATE TABLE Questions(
  Id int NOT NULL AUTO_INCREMENT,
  Question varchar(255) NOT NULL,
  PRIMARY KEY(Id)
);

CREATE TABLE Users(
  Id int NOT NULL AUTO_INCREMENT,
  Username varchar (255) UNIQUE NOT NULL,
  Email varchar (255) UNIQUE NOT NULL,
  Password varchar (255) NOT NULL,
  Question1 int NOT NULL,
  Question1Ans varchar(255) NOT NULL,
  Question2 int NOT NULL,
  Question2Ans varchar(255) NOT NULL,
  PRIMARY KEY(Id),
  FOREIGN KEY(Question1) REFERENCES Questions(Id),
  FOREIGN KEY(Question2) REFERENCES Questions(Id)
);

CREATE TABLE Snippets(
  Id int NOT NULL AUTO_INCREMENT,
  Lang varchar (255) NOT NULL,
  Description varchar (255) NOT NULL,
  Code varchar (255) NOT NULL,
  UserId int NOT NULL,
  PRIMARY KEY(Id),
  FOREIGN KEY(UserId) REFERENCES Users(Id)
);

INSERT INTO Questions(Question)
VALUES
  ("What is your father's middle name?"),
  ("What was the name of your first pet?"),
  ("What was your first car?"),
  ("What is your favorite video game?"),
  ("What is your favorite programming language?");

INSERT INTO Users(Username, Email, Password, Question1, Question1Ans, Question2, Question2Ans)
VALUES
  ("Dylan", "dylan@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Alex", "alex@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Jason", "jason@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Josh", "josh@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Jon", "jon@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K");

INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES
  ("SQL", "Wildcard", "SELECT * FROM Customers WHERE City LIKE 'ber%';", 1),
  ("SQL", "AUTO_INCREMENT", "CREATE TABLE Persons (Personid int NOT NULL AUTO_INCREMENT, LastName varchar(255) NOT NULL, FirstName varchar(255), Age int, PRIMARY KEY (Personid));", 1),
  ("Java", "String Length", "var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; var sln = txt.length;", 1),
  ("Python", "Casting", "Python Casting", 2),
  ("Java", "DB connect from Function Junction", "function buildSnippet(dbObject) {return {creator: dbObject.User, language: dbObject.Language, description: dbObject.Description, Snip: dbObject.Snippet};}", 2),
  ("C++", "Creating Pointers", "string food = 'Pizza'; string* ptr = &food;", 2),
  ("Python", "Python Dictionaries", " thisdict =  {'brand': 'Ford', 'model': 'Mustang', 'year': 1964} print(thisdict)", 2),
  ("Linux", "Echo into file", " echo 'hello world' > world.txt", 3),
  ("Linux", "Get a list of all node process ids", "ps aux | grep node", 3),
  ("jQuery", "Hiding", " $(this).hide();", 3),
  ("Java", "Objects", "var car = {type:'Fiat', model:'500', color:'white'};", 4),
  ("Python", "If", "a = 33 b = 200 if b > a: print('b is greater than a')", 4),
  ("C++", "Switch", "switch(expression) {case x: break; case y: break; default: }", 4),
  ("Python", "Swap  between two variable", "a = 1 b = 2 a, b = b, a print(a) print", 5),
  ("Linux", "Change BASH prompt TEMP", "export PS1='\u >'", 5),
  ("C++", "Break", "for (int i = 0; i < 10; i++) {if (i == 4) {break;} cout << i << '\n';}", 5),
  ("C#", "Get User Input", "// Type your username and press enter Console.WriteLine('Enter username:'); string userName = Console.ReadLine(); Console.WriteLine('Username is: '' + userName);", 5);
