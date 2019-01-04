import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FavouriteItemsPage } from './favourite-items.page';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

describe('FavouriteItemsPage', () => {
  let component: FavouriteItemsPage;
  let fixture: ComponentFixture<FavouriteItemsPage>;

  beforeEach(async(() => {
    const storageSpy = jasmine.createSpyObj('Storage', ['get', 'set']);
    storageSpy.get.and.returnValue(Promise.resolve());
    storageSpy.set.and.returnValue(Promise.resolve());

    const toastSpy = jasmine.createSpyObj('Toast', ['present', 'dismissAll', 'setContent', 'setSpinner']);
    toastSpy.present.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [FavouriteItemsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToastController,
        ShoppingListService,
        { provide: Storage, useValue: storageSpy },
        { provide: ToastController, useValue: { create: () => Promise.resolve(toastSpy) }},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to shoping list', async(() => {
    const item = new ShoppingItem();
    item.name = 'item1';

    fixture.whenStable().then(() => {
      component.addToShoppingList(item);

      const shoppingList: ShoppingListService = TestBed.get(ShoppingListService);
      expect(shoppingList.get().length).toBe(1);
    });
  }));
});
