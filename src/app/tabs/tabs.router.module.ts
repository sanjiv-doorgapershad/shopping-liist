import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        children: [
          {
            path: '',
            loadChildren: './shopping-list/shopping-list.module#ShoppingListPageModule'
          }
        ]
      },
      {
        path: 'favourites-list',
        children: [
          {
            path: '',
            loadChildren: './favourite-items/favourite-items.module#FavouriteItemsPageModule'
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: './about/about.module#AboutPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/shopping-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/shopping-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
