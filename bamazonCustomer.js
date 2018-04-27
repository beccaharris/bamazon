const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "",
  database: "bamazon"
})

connection.connect(function(err) {
  if (err) throw err;
  queryAllProducts();
})

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;
  
    console.log(` WELCOME TO BAMAZON!\n ~|~|~|~|~|~|~|~|~|~\nBelow is a list of all of the available products.\n--------------------------------------------------------------------------------------------------`)

    for(let i = 0; i < res.length; i++){
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Price: " + res[i].price);
      console.log('--------------------------------------------------------------------------------------------------')
    }
  });
}
