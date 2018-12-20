import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { FavouriteShoppingItemsPage } from '../favourite-shopping-items/favourite-shopping-items';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ShoppingListPage;
  tab2Root = FavouriteShoppingItemsPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
