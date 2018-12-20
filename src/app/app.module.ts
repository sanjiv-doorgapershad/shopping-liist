import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Deeplinks } from '@ionic-native/deeplinks';

import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { FavouriteShoppingItemsPage } from '../pages/favourite-shopping-items/favourite-shopping-items';
import { ShoppingListService } from '../services/shopping-list.service';
import { FavouritesListService } from '../services/favourites-list.service';
import { SocialSharingService } from '../services/social-sharing.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    ShoppingListPage,
    FavouriteShoppingItemsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    ShoppingListPage,
    FavouriteShoppingItemsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListService,
    FavouritesListService,
    SocialSharingService,
    Deeplinks
  ]
})
export class AppModule {}
