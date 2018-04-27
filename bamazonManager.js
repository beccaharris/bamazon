const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})

function start() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
    }).then(function (ans) {
      switch (ans.options) {
        case "View products for sale":
          viewAllItems()
          break;
        case "View low inventory":
          viewLowInventory();
          break;
        case "Add to inventory":
          addToInventory();
          break;
        case "Add new product":
          addNewProd();
          break;
      }
    })
}

function viewAllItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(`\nBelow is a list of all of the available products and their information.`);
    console.log('--------------------------------------------------------------------------------------------------')
    res.forEach(function (item) {
      console.log(`ID: ${item.item_id} | Product: ${item.product_name} |  Department: ${item.department_name} | Price: $${item.price} | Stock Quantity: ${item.stock_qty}`);
      console.log('--------------------------------------------------------------------------------------------------')
    });
    repromptManager()
  })
}

function viewLowInventory() {
  connection.query(`SELECT * FROM products where stock_qty < ?`, 5, function (err, res) {
    console.log(`\nBelow is a list of all products with a stock quantity of less than 5.`);
    console.log('--------------------------------------------------------------------------------------------------')
    res.forEach(function (item) {
      console.log(`ID: ${item.item_id} | Product: ${item.product_name} |  Department: ${item.department_name} | Price: $${item.price} | Stock Quantity: ${item.stock_qty}`);
      console.log('--------------------------------------------------------------------------------------------------')
    })
    repromptManager()
  })
}

function addToInventory() {

  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    var items = [];
    res.forEach(function (item) {
      items.push(item.product_name)
    });
    inquirer
      .prompt([
        {
          name: "product_name",
          message: "For which item would you like to increase the quantity?",
          type: "list",
          choices: items
        }, {
          name: "to_add",
          message: "How many would you like to add to the existing quantity?",
          type: "input",
          validate: function validateQTY(to_add) {
            if (isNaN(to_add) || to_add < 0 || to_add == "") {
              valid = `Quantity must be a valid number`
            } else {
              return true
            }
            return valid;
          }
        }
      ]).then(function (ans) {
        let currentQty;
        for (let i = 0; i < res.length; i++) {
          if (res[i].product_name === ans.product_name) {
            currentQty = res[i].stock_qty
          }
        }
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_qty: currentQty + parseInt(ans.to_add)
          }, {
            product_name: ans.product_name
          }
        ], function (err, res) {
          if (err) throw err;
          console.log(`The quantity for ${ans.product_name} has been updated`)
          repromptManager()
        });
      })
    })  
}

function addNewProd() {
  console.log(`\nFollow the prompts to add a new product`);
  console.log('--------------------------------------------------------------------------------------------------');
  inquirer
    .prompt([
      {
        name: "new_prod_name",
        type: "input",
        message: "Type the name of the new product",
        validate: function validateName(new_prod_name) {
          if (new_prod_name == "") {
            valid = `You must enter a valid product name`
          } else {
            return true
          }
          return valid;
        }
      }, {
        name: "new_prod_dept",
        type: "list",
        message: "Select the department for the new product",
        choices: ["Apparel", "Electronics", "Health & Household", "Pets", "Other"]
      }, {
        name: "new_prod_price",
        type: "input",
        message: "Product price: ",
        validate: function validateName(new_prod_price) {
          if (isNaN(new_prod_price) || new_prod_price == "" || new_prod_price <= 0) {
            valid = `You must enter a valid price greater than zero.`
          } else {
            return true
          }
          return valid;
        }
      }, {
        name: "new_prod_qty",
        type: "input",
        message: "Product stock quantity: ",
        validate: function validateName(new_prod_qty) {
          if (isNaN(new_prod_qty) || new_prod_qty == "" || new_prod_qty <= 0) {
            valid = `You must enter a valid number greater than zero.`
          } else {
            return true
          }
          return valid;
        }
      }
    ]).then(function (ans) {
      connection.query("INSERT INTO products SET?",
        {
          product_name: ans.new_prod_name.trim(),
          department_name: ans.new_prod_dept,
          price: parseFloat(ans.new_prod_price),
          stock_qty: parseInt(ans.new_prod_qty)
        }, function (err, res) {
          console.log(res.affectedRows + " new product has been added!");
          repromptManager()
        }
        
      )
    })
}

function repromptManager() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "do_something_else",
      message: "Would you like to return to the main menu (Y) or exit (n)?"
    }
  ]).then(function(ans) {
    if(ans.do_something_else) {
      start();
    } else {
      console.log('Thanks for your work! See you next time!')
      connection.end()
    }
  })
};

start();