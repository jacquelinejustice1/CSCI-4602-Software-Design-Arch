import {IShapeShop} from './interface';
import {IShopView} from './interface-view'

export class RemoveItemListView implements IShopView{
  constructor(private model: IShapeShop){}

  getView():  string{
    let products = this.model.allProducts();
    if(this.model.allProducts().length === 0){
      return "the cart is empty";
    }
    let result = "";
    for (let i = 0; i < products.length; i++) {
      result += `\n${i}:  ${products[i].getName()}`;
    }
    return `Name(s): ${result}`;
  }

}