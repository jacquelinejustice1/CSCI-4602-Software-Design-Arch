//User Interface for The Shopping Cart 
//@author James Church
import { ShapeShopModel } from "./model";
import { ShapeShopController } from "./controller1";
import { TotalPriceView } from "./total-price-view";
import { RemoveItemListView } from "./item-view-remove";
import { AllProductsView } from "./all-view";


export function start() {
  let model = new ShapeShopModel();
  let totalView = new TotalPriceView(model);
  let removeView = new RemoveItemListView(model);
  let allView = new AllProductsView(model);
  let controller = new ShapeShopController(model,allView,removeView,totalView);
  controller.start();
}


