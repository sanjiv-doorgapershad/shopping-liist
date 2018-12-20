import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouriteShoppingItemsPage } from './favourite-shopping-items';

@NgModule({
  declarations: [
    FavouriteShoppingItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouriteShoppingItemsPage),
  ],
})
export class FavouriteShoppingItemsPageModule {}
