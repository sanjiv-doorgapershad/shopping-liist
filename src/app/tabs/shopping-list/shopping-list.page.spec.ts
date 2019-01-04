import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListPage } from './shopping-list.page';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { FavouritesListService } from 'src/app/services/favourites-list.service';

describe('ShoppingListPage', () => {
  let component: ShoppingListPage;
  let fixture: ComponentFixture<ShoppingListPage>;

  const shoppingItem1 = new ShoppingItem();
  shoppingItem1.name = 'item1';

  beforeEach(async(() => {
    const storageSpy = jasmine.createSpyObj('Storage', ['get', 'set']);
    storageSpy.get.and.returnValue(Promise.resolve());
    storageSpy.set.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [ShoppingListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToastController,
        ShoppingListService,
        FavouritesListService,
        { provide: Storage, useValue: storageSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should add item', async(() => {

    fixture.whenStable().then(() => {
      component.addItem(shoppingItem1);
    });

  }));

  xit('should remove item', () => {
  });

  xit('should add favourite', () => {
  });

  xit('should remove favourite', () => {
  });
});
