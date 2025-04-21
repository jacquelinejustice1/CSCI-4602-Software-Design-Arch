import readlineSync = require('readline-sync'); //for easier repeated prompts

import {Product} from './products';
import {IShapeShop} from './interface';
import { IShopView } from './interface-view';
import { IShopViewRemove } from './interface-remove';
import { IShopTotalView } from './interface-view-total';


export class ShapeShopController{
    constructor(private model: IShapeShop, private view: IShopView, 
        private viewRemove: IShopViewRemove, private viewTotal: IShopTotalView){};

start(): void {
    
    while(true){ //run until we exit
      console.log(`Welcome to the Shape Store! We offer the best shapes! Pick an option:
       1. Add an item to the cart.
       2. Remove an item to the cart.
       3. View the items in the cart.
       4. View the price of all items.
       5. Quit.`);
  
      let response = readlineSync.question('> ')
      if(response === '5' || response.slice(0,2).toLowerCase() === ':q'){
        break; //stop looping, thus leaving method
      }
  
      switch(response) { //handle each response
        case '1': 
          let product = this.letUserSelectItem();
          let quantity = this.letUserSelectQuantity();
          this.model.addItemToCart(product,quantity); 
          console.log(this.model.allProducts());
          break;
        case '2': 
          console.log(this.viewRemove.getView());
          let itemToRemove = this.removeItemFromCart();
          this.model.removeItemFromCart(itemToRemove); 
          console.log(this.model.allProducts());
          break;
        case '3': 
             console.log(this.view.getView());
            break;
        case '4': 
            console.log(this.viewTotal.getView());
            break;
        default: console.log('Invalid option!');
      }
      console.log(''); //extra empty line for revisiting
    }
  }
  
  letUserSelectItem(): Product{
    while (true) { 
      console.log(`Here you can select your shape. \n Pick an option: 
        \n 1. Buy a Triangle! 
        \n 2. Buy a Square! 
        \n 3. Buy a Pentagon! 
        \n 4. Go back. Don't buy anything.`); 
      let response = readlineSync.question('> '); 
  
      switch (response) { 
        case '1': return new Product("Triangle", 3.5, "It's got three sides!"); 
        case '2': return new Product("Square", 4.5, "It's got four sides!"); 
        case '3': return new Product("Pentagon", 5.5, "It's got five sides!");  
        default: console.log('Invalid option! Please choose a valid shape.'); 
      } 
    }
  }
  
  letUserSelectQuantity(): number {
      console.log(`How many of this shape would you like to purchase?`);
      let response = readlineSync.question('> ')
      return parseInt(response);
    }
  
  removeItemFromCart(): number{
      console.log(`Select an item to be removed from the cart.`);
      let response = readlineSync.question('> ')
      let toRemove = parseInt(response);
      return toRemove;
    }
  }