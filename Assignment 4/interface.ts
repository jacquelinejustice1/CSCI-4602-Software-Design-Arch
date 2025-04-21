import {Product} from './products';


export interface IShapeShop{
    shape_shop_state(): string;
    allProducts(): Product[];
    addItemToCart(product: Product, quantity: number): string;
    removeItemFromCart(index: number): void;
  }