import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ItemSliding, ToastController, IonicPage } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FavouritesListService } from '../../services/favourites-list.service';
import { SocialSharingService } from '../../services/social-sharing.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  public newItem: ShoppingItem;
  public favouritesFiltered: ShoppingItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shoppingListService: ShoppingListService,
    public toastController: ToastController,
    public sharingService: SocialSharingService,
    private favouriteItemsService: FavouritesListService
  ) {}

  ngOnInit() {
    this.newItem = new ShoppingItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
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
  }

  addFavourite(item: ShoppingItem, slidingItem: ItemSliding) {
    this.favouriteItemsService.add(item);
    slidingItem.close();
    this.prsentToast(`Added ${item.name} to favourites.`);
  }

  removeFavourite(item: ShoppingItem, slidingItem: ItemSliding) {
    this.favouriteItemsService.remove(item);
    slidingItem.close();
    this.prsentToast(`Removed ${item.name} from favourites.`);
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

  shareShoppingList() {
    this.sharingService.share(JSON.stringify(this.shoppingListService.get()));
  }

  private prsentToast(toastMessage: string) {
    const toast = this.toastController.create({
      message: toastMessage,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
