import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, IonItemSliding, IonList } from '@ionic/angular';

import { ShoppingItem } from '../../models/shopping-item';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FavouritesListService } from '../../services/favourites-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.page.html',
  styleUrls: ['shopping-list.page.scss']
})
export class ShoppingListPage implements OnInit {

  @ViewChild('shoppingList') slidingList: IonList;

  public newItem: ShoppingItem;
  public favouritesFiltered: ShoppingItem[];

  constructor(
    public toastController: ToastController,
    public shoppingListService: ShoppingListService,
    private favouriteItemsService: FavouritesListService
  ) {}

  ngOnInit() {
    this.newItem = new ShoppingItem();
  }

  addItem(item: ShoppingItem) {

    if (item.isFavourite) {
      this.shoppingListService.add(item);
    } else {
      const tempItem = new ShoppingItem();
      tempItem.name = item.name;
      this.shoppingListService.add(tempItem);
    }

    // Clean up
    this.newItem.name = '';
    this.favouritesFiltered.length = 0;

    this.slidingList.closeSlidingItems();
  }

  removeItem(item: ShoppingItem, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.shoppingListService.remove(item);
    this.presentToast(`Removed ${item.name}.`);
  }

  addFavourite(item: ShoppingItem, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.favouriteItemsService.add(item);
    this.presentToast(`Added ${item.name} to favourites.`);
  }

  removeFavourite(item: ShoppingItem, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.favouriteItemsService.remove(item);
    this.presentToast(`Removed ${item.name} from favourites.`);
  }

  getFavourites(event: any) {
    const favItems = this.favouriteItemsService.get();
    const search = event.target.value;

    if (search && search.trim() !== '') {
      this.favouritesFiltered = favItems.filter((item) => {
        return item.name.trim().includes(search.trim());
      });
    } else {
      this.favouritesFiltered.length = 0;
    }
  }

  reorderItems(ev) {
    this.shoppingListService.reorderItems(ev.detail.from, ev.detail.to);
    ev.detail.complete();
  }

  shareShoppingList() {
    // this.sharingService.share(JSON.stringify(this.shoppingListService.get()));
  }

  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
