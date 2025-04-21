import {IShapeShop} from './interface';
import {IShopView} from './interface-view'

export class AllProductsView implements IShopView{
    constructor(private model: IShapeShop){}
  
    getView(): string{
      if(this.model.allProducts().length === 0){
        return "the cart is empty";
      }
      return this.model.shape_shop_state();

    } 
  }