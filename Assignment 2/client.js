"use strict";
//Client application for our grocery store.
//@author James Church
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
var fetch = require("sync-fetch");
var readlineSync = require("readline-sync");
var url = "http://localhost:3000";
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.items = [];
    }
    ShoppingCart.prototype.add = function (item) {
        this.items.push(item);
    };
    ShoppingCart.prototype.getItems = function () {
        return this.items;
    };
    ShoppingCart.prototype.remove = function (item) {
        var indexToRemove = this.items.indexOf(item);
        if (indexToRemove > -1) {
            this.items.splice(indexToRemove, 1);
        }
    };
    return ShoppingCart;
}());
/**
 * Function to run the UI
 */
function start() {
    showMainMenu(new ShoppingCart());
}
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(sc) {
    while (true) { //run until we exit
        console.log("Welcome to the Grocery System!\n  1. Add a product to the cart.\n  2. Get Total.\n  3. Remove a product from the cart.\n  4. Quit.");
        var response = readlineSync.question('> ');
        if (response === '4' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                addProductToCart(sc);
                break;
            case '2':
                getTotalOfCart(sc);
                break;
            case '3':
                removeItemsFromCart(sc);
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
function showProducts() {
    var response = fetch(url + "/products");
    var products = response.json();
    console.log("All products.");
    for (var product in products) {
        console.log("-- Select ".concat(product, ": ").concat(products[product]["title"], " $").concat(products[product]["price"], "."));
    }
    console.log("");
}
function addProductToCart(sc) {
    showProducts();
    console.log("Which product would you like to add?");
    var response = readlineSync.question('> ');
    sc.add(response);
}
function getTotalOfCart(sc) {
    var cartStr = JSON.stringify(sc.getItems());
    console.log("Getting Total in Client: " + cartStr);
    var total = fetch(url + "/total", {
        method: 'POST',
        body: cartStr,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    var tax = fetch(url + "/taxes", {
        method: 'POST',
        body: cartStr,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    var totalText = total.json();
    var taxText = tax.json();
    console.log("Your cart total is $".concat(totalText, "."));
    console.log("Your taxes are $".concat(taxText.toFixed(2), "."));
    console.log("Your combined total is $".concat((totalText + taxText).toFixed(2), "."));
}
//This function removes an item from the cart
function removeItemsFromCart(sc) {
    var cartStr = JSON.stringify(sc.getItems());
    console.log("Getting Total in Client: " + cartStr);
    console.log("Which product would you like to remove?");
    var response = readlineSync.question('> ');
    sc.remove(response);
}
start();
