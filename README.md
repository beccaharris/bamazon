# bamazon
#### This app allows users to do a couple different things: 
* Users can "purchase" items through the command line interface. (bamazonCustomer.js)

## Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
* Node
* Sequel Pro or some other database management application. 
* Clone repo to your local computer. 

### Installing
```
npm init 
npm install mysql
npm install inquirer
```
*Ensure the ```node_modules/ ``` folder is in your .gitignore file. If it's not, add it.*

## Running it
**bamazonCustomer.js**
* Open the app in your integrated terminal or cd into the app folder in your regular terminal
* Run ```node bamazonCustomer.js```
* Navigate through the questions with which you are prompted. 
* To kill the server, press CTRL-C

**bamazonManager.js**
* Open the app in your integrated terminal or cd into the app folder in your regular terminal
* Run ```node bamazonManager.js```
* You'll be prompted with some menu items. Select whichever one you want and work your way through. At the end of whatever selection, you'll have the option to return to the main menu or exit. 

## Built With
* <a href="https://nodejs.org/en/">Node.js v8.9.4</a>
* <a href="https://www.sequelpro.com/">Sequel Pro</a>
* <a href="https://www.npmjs.com/package/inquirer#prompt">Inquirer.js</a>
* <a href="https://www.npmjs.com/package/mysql">mysql</a>



