import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ShoppingItem } from '../models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class FavouritesListService {

  private key_FavouritesList = 'FavouritesList';
  private favouritesList: ShoppingItem[];

  constructor(private storage: Storage) {
    this.storage.get(this.key_FavouritesList).then((items: ShoppingItem[]) => {
      this.favouritesList = items;

      if (!this.favouritesList) {
        this.favouritesList = new Array<ShoppingItem>();
      }
    });
  }

  public get() {
    return this.favouritesList;
  }

  public add(item: ShoppingItem) {
    item.isFavourite = true;
    this.favouritesList.push(item);
    this.save();
  }

  public remove(item: ShoppingItem) {
    const index = this.favouritesList.indexOf(item);

    if (index > -1) {
      this.favouritesList.splice(index, 1);
    }

    item.isFavourite = false;
    this.save();
  }

  private save() {
    this.storage.set(this.key_FavouritesList, this.favouritesList);
  }
}
