import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';

import { TabsPage } from '../pages/tabs/tabs';

import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { FavouriteShoppingItemsPage } from '../pages/favourite-shopping-items/favourite-shopping-items';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, deepLinks: Deeplinks) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      deepLinks.routeWithNavController(this.nav, {
        '/shopping-list/:items': ShoppingListPage,
        '/favourites-list/:items': FavouriteShoppingItemsPage
      }).subscribe((match) => {

      }, (nomatch) => {

      });
    });
  }
}
