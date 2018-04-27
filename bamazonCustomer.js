const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})

function queryAllProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(` WELCOME TO BAMAZON!\n ~|~|~|~|~|~|~|~|~|~\nBelow is a list of all of the available products.\n--------------------------------------------------------------------------------------------------`)
    for (let i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Price: " + res[i].price);
      console.log('--------------------------------------------------------------------------------------------------')
    }
    // Will be using this 'valid' variable for multiple validations, so defining outside of inquirer prompt
    let valid;
    inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "Please type the ID of the item you would like to purchase",
        validate: function validateID(id) {
          if (isNaN(id) || id > res.length || id < 0) {
            valid = `ID must be a number between 1 and ${res.length}`
          } else {
            return true
          }
          return valid;
        }
      }, {
        type: "input",
        name: "qty",
        message: "How many would you like to purchase?",
        validate: function validateQTY(qty) {
          if (isNaN(qty) || qty < 0) {
            valid = `Quantity must be a valid number`
          } else {
            return true
          }
          return valid;
        }
      }
    ]).then(function(ans) {
      var itemToPurch = (ans.item_id)-1;
      var qtyToPurch = parseInt(ans.qty);
      var calcTotal = parseFloat((res[itemToPurch].price) * qtyToPurch).toFixed(2);

      if(qtyToPurch <= res[itemToPurch].stock_qty) {
        console.log(`Congratulations on your purchase! Your total is ${calcTotal}. Your items will maybe arrive...someday.`);
        var updateQty = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_qty: res[itemToPurch].stock_qty - qtyToPurch
            },{
              item_id: itemToPurch+1
            }
          ]
        )
      } else {
        console.log(`Insufficient quantity! We only have ${res[itemToPurch].stock_qty} in stock.`)
      }
      repromptUser();
    })
  });
}

function repromptUser() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "buy_more",
      message: "Would you like to purchase another item?"
    }
  ]).then(function(ans) {
    if(ans.buy_more) {
      queryAllProducts();
    } else {
      console.log('Thanks for shopping bamazon! See you next time!')
      connection.end()
    }
  })
}

queryAllProducts();
