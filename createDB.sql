DROP DATABASE IF EXISTS SnippetsDB;

CREATE DATABASE SnippetsDB;

USE SnippetsDB;

CREATE TABLE Languages(
  Id int NOT NULL AUTO_INCREMENT,
  Language varchar(255) NOT NULL,
  PRIMARY KEY(Id)
);

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
  Question1Id int NOT NULL,
  Question1Ans varchar(255) NOT NULL,
  Question2Id int NOT NULL,
  Question2Ans varchar(255) NOT NULL,
  PRIMARY KEY(Id),
  FOREIGN KEY(Question1Id) REFERENCES Questions(Id),
  FOREIGN KEY(Question2Id) REFERENCES Questions(Id)
);

CREATE TABLE Snippets(
  Id int NOT NULL AUTO_INCREMENT,
  Description varchar (255) NOT NULL,
  Code varchar (255) NOT NULL,
  LangId int NOT NULL,
  UserId int NOT NULL,
  PRIMARY KEY(Id),
  FOREIGN KEY(LangId) REFERENCES Languages(Id),
  FOREIGN KEY(UserId) REFERENCES Users(Id)
);

INSERT INTO Languages(Language)
VALUES
  ("SQL"),
  ("Java"),
  ("Python"),
  ("JavaScript"),
  ("C++"),
  ("C#"),
  ("Ruby"),
  ("HTML"),
  ("CSS");

INSERT INTO Questions(Question)
VALUES
  ("What is your father's middle name?"),
  ("What was the name of your first pet?"),
  ("What was your first car?"),
  ("What is your favorite video game?"),
  ("What is your favorite programming language?");

INSERT INTO Users(Username, Email, Password, Question1Id, Question1Ans, Question2Id, Question2Ans)
VALUES
  ("Dylan", "dylan@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Alex", "alex@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Jason", "jason@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Josh", "josh@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K"),
  ("Jon", "jon@abc.com", "$2a$12$lJBwsAW0BtjxcYYixPCuguV4cd/ME6xqVNcc68hKEx5F.7Ca5.Key", 1, "$2a$12$twx3CX4oqZVIa1CTmo79OOD3.eEuIgkDRghKDKRilqJpRvkd/N7wa", 2, "$2a$12$1pj3IwU.HsFashDfEEWGMuHO.atdKLj5lKohxte6X.JT.X6KHlu1K");

INSERT INTO Snippets(Description, Code, LangId, UserId)
VALUES
  ("Wildcard", "SELECT * FROM Customers WHERE City LIKE 'ber%';", 1, 1),
  ("AUTO_INCREMENT", "CREATE TABLE Persons (Personid int NOT NULL AUTO_INCREMENT, LastName varchar(255) NOT NULL, FirstName varchar(255), Age int, PRIMARY KEY (Personid));", 1, 1),
  ("String Length", "var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; var sln = txt.length;", 4, 1),
  ("Casting", "Python Casting", 3, 2),
  ("DB connect from Function Junction", "function buildSnippet(dbObject) {return {creator: dbObject.User, language: dbObject.Language, description: dbObject.Description, Snip: dbObject.Snippet};}", 4, 2),
  ("Creating Pointers", "string food = 'Pizza'; string* ptr = &food;", 5, 2),
  ("Python Dictionaries", " thisdict =  {'brand': 'Ford', 'model': 'Mustang', 'year': 1964} print(thisdict)", 3, 2),
  ("Paragraph tag", "<p> Hello World! </p>", 8, 3),
  ("Center text and color text in paragraph", "p {  text-align: center;   color: red;   }", 9, 3),
  ("Declare Main method", "pulic static void main(String[] args){}", 2, 3),
  ("Objects", "var car = {type:'Fiat', model:'500', color:'white'};", 4, 4),
  ("If", "a = 33 b = 200 if b > a: print('b is greater than a')", 3, 4),
  ("Switch", "switch(expression) {case x: break; case y: break; default: }", 5, 4),
  ("Swap between two variables", "a = 1 b = 2 a, b = b, a print(a) print", 3, 5),
  ("if, else statement", "if name == 'Bob'  puts 'Hi Bob'   else   puts 'Hi person!'" , 7, 5),
  ("Break", "for (int i = 0; i < 10; i++) {if (i == 4) {break;} cout << i << '\n';}", 5, 5),
  ("Get User Input", "// Type your username and press enter Console.WriteLine('Enter username:'); string userName = Console.ReadLine(); Console.WriteLine('Username is: '' + userName);", 6, 5);
