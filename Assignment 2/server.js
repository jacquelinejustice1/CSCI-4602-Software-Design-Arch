"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
// Let's pretend that this is our product database.
var productDatabase = {
    'apples': { 'title': 'Tasty Apples', 'price': 2.19 },
    'oranges': { 'title': 'Delicious Oranges', 'price': 2.88 },
    'grapes': { 'title': 'Grapes. Just grapes.', 'price': 1.69 },
    'limes': { 'title': 'Sour Limes', 'price': .99 }
};
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// This gets the product database!
app.get('/products', function (req, res) {
    console.log("Request for product database.");
    res.send(JSON.stringify(productDatabase));
});
// This will return the total from a list of products.
app.post('/total', function (req, res) {
    var cart = req.body;
    var total = getTotal(cart);
    console.log("Sending: " + total);
    res.send("".concat(total));
});
// This will return the total taxes from a list of products
app.post('/taxes', function (req, res) {
    var cart = req.body;
    var cartTotal = getTotal(cart);
    var tax = cartTotal * 0.095;
    console.log("Sending: " + tax);
    res.send("".concat(tax));
});
// This starts our server.
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
// This computes the total.
function getTotal(cart) {
    console.log("Get Total: " + cart);
    var total = 0;
    for (var _i = 0, cart_1 = cart; _i < cart_1.length; _i++) {
        var item = cart_1[_i];
        total += getPrice(item);
    }
    return total;
}
// This gets the price of one item.
function getPrice(item) {
    console.log("GetPrice: " + item);
    return productDatabase[item]['price'];
}
