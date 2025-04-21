import {IShapeShop} from './interface';
import {IShopView} from './interface-view'

export class TotalPriceView implements IShopView{
    constructor(private model: IShapeShop){}
  
    getView(): string{
      if(this.model.allProducts().length === 0){
        return "the cart is empty";
      }
      let products = this.model.allProducts();
      let total = 0;
      for(let i = 0; i < products.length; i++){
        total += products[i].getPrice();
      }
      return `Total Price: $${total.toFixed(2)}`;
    }
  }