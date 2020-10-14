DROP DATABASE IF EXISTS SnippetsDB;

CREATE DATABASE SnippetsDB;

USE SnippetsDB;

CREATE TABLE Users(
  Id int NOT NULL AUTO_INCREMENT,
  Username varchar (255) UNIQUE NOT NULL,
  Email varchar (255) UNIQUE NOT NULL,
  Password varchar (255) NOT NULL,
  PRIMARY KEY(Id)
);

CREATE TABLE Snippets(
  Id int NOT NULL AUTO_INCREMENT,
  Lang varchar (255) NOT NULL,
  Description varchar (255) NOT NULL,
  Code varchar (255) NOT NULL,
  Creator varchar (255) NOT NULL,
  Email varchar (255) NOT NULL,
  PRIMARY KEY(Id),
  FOREIGN KEY(Creator) REFERENCES Users(Username),
  FOREIGN KEY(Email) REFERENCES Users(Email)
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

INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("SQL", "Wildcard", "SELECT * FROM Customers WHERE City LIKE 'ber%';", "Dylan", "dylan@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("SQL", "AUTO_INCREMENT", "CREATE TABLE Persons (Personid int NOT NULL AUTO_INCREMENT, LastName varchar(255) NOT NULL, FirstName varchar(255), Age int, PRIMARY KEY (Personid));", "Dylan", "dylan@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Java", "String Length", "var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; var sln = txt.length;", "Dylan", "dylan@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Python", "Casting", "Python Casting", "Alex", "alex@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Java", "DB connect from Function Junction", "function buildSnippet(dbObject) {return {creator: dbObject.User, language: dbObject.Language, description: dbObject.Description, Snip: dbObject.Snippet};}", "Alex", "alex@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("C++", "Creating Pointers", "string food = 'Pizza'; string* ptr = &food;", "Alex", "alex@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Python", "Python Dictionaries", " thisdict =  {'brand': 'Ford', 'model': 'Mustang', 'year': 1964} print(thisdict)", "Alex", "alex@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Linux", "Echo into file", " echo 'hello world' > world.txt", "Jason", "jason@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Linux", "Get a list of all node process ids", "ps aux | grep node", "Jason", "jason@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("jQuery", "Hiding", " $(this).hide();", "Jason", "jason@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Java", "Objects", "var car = {type:'Fiat', model:'500', color:'white'};", "Josh", "josh@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Python", "If", "a = 33 b = 200 if b > a: print('b is greater than a')", "Josh", "josh@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("C++", "Switch", "switch(expression) {case x: break; case y: break; default: }", "Josh", "josh@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Python", "Swap values between two variable", "a = 1 b = 2 a, b = b, a print(a) print", "Jon", "jon@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("Linux", "Change BASH prompt TEMP", "export PS1='\u >'", "Jon", "jon@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("C++", "Break", "for (int i = 0; i < 10; i++) {if (i == 4) {break;} cout << i << '\n';}", "Jon", "jon@abc.com");
INSERT INTO Snippets(Lang, Description, Code, Creator, Email)
VALUES ("C#", "Get User Input", "// Type your username and press enter Console.WriteLine('Enter username:'); string userName = Console.ReadLine(); Console.WriteLine('Username is: '' + userName);", "Jon", "jon@abc.com");
