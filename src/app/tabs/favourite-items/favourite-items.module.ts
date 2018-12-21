import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouriteItemsPage } from './favourite-items.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: FavouriteItemsPage }])
  ],
  declarations: [FavouriteItemsPage]
})
export class FavouriteItemsPageModule {}
