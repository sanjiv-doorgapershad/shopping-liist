import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { FavouritesListService } from '../../services/favourites-list.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ShoppingItem } from '../../models/shopping-item.model';

/**
 * Generated class for the FavouriteShoppingItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourite-shopping-items',
  templateUrl: 'favourite-shopping-items.html'
})
export class FavouriteShoppingItemsPage {
  paramItems: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public favouritesService: FavouritesListService,
    public shoppingListService: ShoppingListService,
    public toastController: ToastController
  ) {
    this.paramItems = navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouriteShoppingItemsPage');
  }

  addToShoppingList(item: ShoppingItem) {
    this.shoppingListService.add(item);

    const toast = this.toastController.create({
      message: `Added ${item.name} to shopping list.`,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
