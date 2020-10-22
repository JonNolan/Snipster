DROP DATABASE IF EXISTS SnippetsDB;

CREATE DATABASE SnippetsDB;

USE SnippetsDB;

CREATE TABLE Users(
  Id int NOT NULL AUTO_INCREMENT,
  Username varchar (255) UNIQUE NOT NULL,
  Email varchar (255) UNIQUE NOT NULL,
  Password varchar (255) NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE Snippets(
  Id int NOT NULL AUTO_INCREMENT,
  Lang varchar (255) NOT NULL,
  Description varchar (255) NOT NULL,
  Code varchar (255) NOT NULL,
  UserId int NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY(UserId) REFERENCES Users(Id)
);

INSERT INTO Users(Username, Email, Password)
VALUES ("Dylan", "dylan@abc.com", "Password1");
INSERT INTO Users(Username, Email, Password)
VALUES ("Alex", "alex@abc.com", "Password2");
INSERT INTO Users(Username, Email, Password)
VALUES ("Jason", "jason@abc.com", "Password3");
INSERT INTO Users(Username, Email, Password)
VALUES ("Josh", "josh@abc.com", "Password4");
INSERT INTO Users(Username, Email, Password)
VALUES ("Jon", "jon@abc.com", "Password5");

INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("SQL", "Wildcard", "SELECT * FROM Customers WHERE City LIKE 'ber%';", 1);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("SQL", "AUTO_INCREMENT", "CREATE TABLE Persons (Personid int NOT NULL AUTO_INCREMENT, LastName varchar(255) NOT NULL, FirstName varchar(255), Age int, PRIMARY KEY (Personid));", 1);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Java", "String Length", "var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; var sln = txt.length;", 1);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Python", "Casting", "Python Casting", 2);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Java", "DB connect from Function Junction", "function buildSnippet(dbObject) {return {creator: dbObject.User, language: dbObject.Language, description: dbObject.Description, Snip: dbObject.Snippet};}", 2);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("C++", "Creating Pointers", "string food = 'Pizza'; string* ptr = &food;", 2);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Python", "Python Dictionaries", " thisdict =  {'brand': 'Ford', 'model': 'Mustang', 'year': 1964} print(thisdict)", 2);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Linux", "Echo into file", " echo 'hello world' > world.txt", 3);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Linux", "Get a list of all node process ids", "ps aux | grep node", 3);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("jQuery", "Hiding", " $(this).hide();", 3);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Java", "Objects", "var car = {type:'Fiat', model:'500', color:'white'};", 4);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Python", "If", "a = 33 b = 200 if b > a: print('b is greater than a')", 4);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("C++", "Switch", "switch(expression) {case x: break; case y: break; default: }", 4);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Python", "Swap values between two variable", "a = 1 b = 2 a, b = b, a print(a) print", 5);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("Linux", "Change BASH prompt TEMP", "export PS1='\u >'", 5);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("C++", "Break", "for (int i = 0; i < 10; i++) {if (i == 4) {break;} cout << i << '\n';}", 5);
INSERT INTO Snippets(Lang, Description, Code, UserId)
VALUES ("C#", "Get User Input", "// Type your username and press enter Console.WriteLine('Enter username:'); string userName = Console.ReadLine(); Console.WriteLine('Username is: '' + userName);", 5);
