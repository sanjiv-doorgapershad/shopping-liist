import { Component } from '@angular/core';
import { FavouritesListService } from '../../services/favourites-list.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ToastController } from '@ionic/angular';
import { ShoppingItem } from '../../models/shopping-item';

@Component({
  selector: 'app-favourite-items',
  templateUrl: 'favourite-items.page.html',
  styleUrls: ['favourite-items.page.scss']
})
export class FavouriteItemsPage {

  constructor(
    public toastController: ToastController,
    public shoppingListService: ShoppingListService,
    public favouriteItemsService: FavouritesListService
  ) {}

  async addToShoppingList(item: ShoppingItem) {
    this.shoppingListService.add(item);

    const toast = await this.toastController.create({
      message: `Added ${item.name} to shopping list.`,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
