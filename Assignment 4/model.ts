
import {Product} from './products';
import {IShapeShop} from './interface';

export class ShapeShopModel implements IShapeShop{
    private shopping_cart: Product[];
    private quantity_cart: number[];  
  
    constructor(){
      this.shopping_cart = [];
      this.quantity_cart = [];
    }
  
    addItemToCart(product: Product, quantity: number): string{
      for(let i = 0; i <= quantity -1; i++){
        this.shopping_cart.push(product);
        this.quantity_cart.push(quantity);
      }
      return `Item(s) added to cart: ${product} ${quantity} times`;
    }
  
    removeItemFromCart(index: number): void{
      if (index >= 0 && index < this.shopping_cart.length) 
        { this.shopping_cart.splice(index, 1);
      }else {
        throw new Error("Cannot remove product.");
      }
    }
  
    allProducts(): Product[]{
      return this.shopping_cart;
    }
  
    shape_shop_state(): string{
      if(this.shopping_cart.length == 0){
        return "The cart is empty";
      } 
      let result = '';
      for(let i = 0; i < this.shopping_cart.length; i++){
        result += `Name: ${this.shopping_cart[i].getName()}, 
        \nPrice: ${this.shopping_cart[i].getPrice()},
        \nQuantity: ${this.quantity_cart[i-1]}`;
      }
      return result;
    }
  }