import { Injectable } from '@angular/core';
import { reorderArray } from 'ionic-angular';
import { ShoppingItem } from '../models/shopping-item.model';
import { Storage } from '@ionic/storage';

@Injectable()
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

  reorderItems(indexes) {
    this.shoppingList = reorderArray(this.shoppingList, indexes);
    this.save();
  }

  private save() {
    this.storage.set(this.key_ShoppingList, this.shoppingList);
  }
}
