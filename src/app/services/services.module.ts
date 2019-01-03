import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

import { FavouritesListService } from './favourites-list.service';
import { ShoppingListService } from './shopping-list.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    ShoppingListService,
    FavouritesListService
  ]
})
export class ServicesModule { }
