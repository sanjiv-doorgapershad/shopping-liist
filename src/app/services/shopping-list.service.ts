import { Injectable } from '@angular/core';
import { ShoppingItem } from '../models/shopping-item';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private key_ShoppingList = 'ShoppingList';
  private shoppingList: ShoppingItem[];

  constructor(private storage: Storage) {
    this.storage.get(this.key_ShoppingList).then((items: ShoppingItem[]) => {
      this.shoppingList = items;

      if (!this.shoppingList) {
        this.shoppingList = new Array<ShoppingItem>();
      }
    });
  }

  get() {
    return this.shoppingList;
  }

  add(item: ShoppingItem) {
    this.shoppingList.push(item);
    this.save();
  }

  remove(item: ShoppingItem) {
    const index = this.shoppingList.indexOf(item);

    if (index > -1) {
      this.shoppingList.splice(index, 1);
    }

    this.save();
  }

  clear() {
    this.shoppingList.length = 0;
    this.save();
  }

  reorderItems(indexFrom, indexTo) {
    const element = this.shoppingList[indexFrom];
    this.shoppingList.splice(indexFrom, 1);
    this.shoppingList.splice(indexTo, 0, element);
    this.save();
  }

  private save() {
    this.storage.set(this.key_ShoppingList, this.shoppingList);
  }
}
