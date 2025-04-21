//Client application for our grocery store.
//@author James Church

const fetch = require("sync-fetch");
import readlineSync = require('readline-sync');
let url = "http://localhost:3000"

class ShoppingCart {
    items: string[];

    constructor() {
        this.items = [];
    }

    add(item: string) {
        this.items.push(item);
    }

    getItems(): string[] {
        return this.items;
    }

    remove(item: string){
        const indexToRemove = this.items.indexOf(item);
        if(indexToRemove > -1){
            this.items.splice(indexToRemove,1);
        }
    }
}

/**
 * Function to run the UI
 */
export function start() {
    showMainMenu(new ShoppingCart());
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(sc: ShoppingCart) {
  while(true){ //run until we exit
    console.log(`Welcome to the Grocery System!
  1. Add a product to the cart.
  2. Get Total.
  3. Remove a product from the cart.
  4. Quit.`);

    let response = readlineSync.question('> ')
    if(response === '4' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': addProductToCart(sc); break;
      case '2': getTotalOfCart(sc); break;
      case '3': removeItemsFromCart(sc); break;
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

function showProducts() {
    const response = fetch(url + "/products");
    const products = response.json();

    console.log("All products.");
    for (let product in products) {
        console.log(`-- Select ${product}: ${products[product]["title"]} $${products[product]["price"]}.`);
    }
    console.log("");
}

function addProductToCart(sc: ShoppingCart) {
    showProducts();
    
    console.log(`Which product would you like to add?`);
    let response = readlineSync.question('> ')
    sc.add(response);
}

function getTotalOfCart(sc: ShoppingCart) {
    let cartStr = JSON.stringify(sc.getItems());
    console.log("Getting Total in Client: "+cartStr);

    const total = fetch(url + "/total", {
        method: 'POST',
        body: cartStr,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }});

    const tax = fetch(url + "/taxes", {
        method: 'POST',
        body: cartStr,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }});

   let totalText = total.json();
   let taxText = tax.json();   

   console.log(`Your cart total is $${totalText}.`);
   console.log(`Your taxes are $${taxText.toFixed(2)}.`);
   console.log(`Your combined total is $${(totalText + taxText).toFixed(2)}.`);
}

//This function removes an item from the cart
function removeItemsFromCart(sc: ShoppingCart){
    let cartStr = JSON.stringify(sc.getItems());
    console.log("Getting Total in Client: "+cartStr);

    console.log(`Which product would you like to remove?`);
    let response = readlineSync.question('> ');
    sc.remove(response);
}

start();

