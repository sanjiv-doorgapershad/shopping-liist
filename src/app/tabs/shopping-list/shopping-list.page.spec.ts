import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ShoppingListPage } from './shopping-list.page';
import { ToastController, IonList, IonItemSliding } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { FavouritesListService } from 'src/app/services/favourites-list.service';

describe('ShoppingListPage', () => {
  let component: ShoppingListPage;
  let fixture: ComponentFixture<ShoppingListPage>;

  const shoppingItem1 = new ShoppingItem();
  shoppingItem1.name = 'item1';

  const shoppingItem2 = new ShoppingItem();
  shoppingItem2.name = 'item2';

  const shoppingItem3 = new ShoppingItem();
  shoppingItem3.name = 'item3';

  const favShoppingItem1 = new ShoppingItem();
  favShoppingItem1.name = 'fav_Bread';
  favShoppingItem1.isFavourite = true;

  const favShoppingItem2 = new ShoppingItem();
  favShoppingItem2.name = 'fav_Milk';
  favShoppingItem2.isFavourite = true;

  const favShoppingItem3 = new ShoppingItem();
  favShoppingItem3.isFavourite = true;

  const shopListStub = new Array<ShoppingItem>();
  shopListStub.push(shoppingItem1);
  shopListStub.push(shoppingItem2);
  shopListStub.push(shoppingItem3);

  const favListStub = new Array<ShoppingItem>();
  favListStub.push(favShoppingItem1);
  favListStub.push(favShoppingItem2);
  favListStub.push(favShoppingItem3);

  let toastSpy;

  beforeEach(async(() => {
    const storageSpy = jasmine.createSpyObj('Storage', ['get', 'set']);
    storageSpy.get.and.returnValue(Promise.resolve());
    storageSpy.set.and.returnValue(Promise.resolve());

    toastSpy = jasmine.createSpyObj('Toast', ['present', 'dismissAll', 'setContent', 'setSpinner']);
    toastSpy.present.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [ShoppingListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ToastController,
        ShoppingListService,
        FavouritesListService,
        { provide: Storage, useValue: storageSpy },
        { provide: ToastController, useValue: { create: () => Promise.resolve(toastSpy) }}
      ]
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

  it('should add shopping item', async(() => {

    fixture.whenRenderingDone().then(() => {
      const shoppingList: ShoppingListService = TestBed.get(ShoppingListService);
      spyOn(shoppingList, 'add');
      component.addItem(shoppingItem1);
      expect(shoppingList.add).toHaveBeenCalledWith(shoppingItem1);
    });

  }));

  it('should add favourite shopping item', async(() => {

    fixture.whenRenderingDone().then(() => {
      const shoppingList: ShoppingListService = TestBed.get(ShoppingListService);
      spyOn(shoppingList, 'add');
      component.addItem(favShoppingItem1);
      expect(shoppingList.add).toHaveBeenCalledWith(favShoppingItem1);
    });

  }));

  it('should remove item', async(() => {
    const itemSlidingSpy = jasmine.createSpyObj('ItemSliding', ['close']);
    itemSlidingSpy.close.and.returnValue(Promise.resolve());

    fixture.whenRenderingDone().then(() => {
      const shoppingList: ShoppingListService = TestBed.get(ShoppingListService);
      spyOn(shoppingList, 'remove');

      spyOn(component, 'presentToast');

      component.removeItem(shoppingItem1, itemSlidingSpy);
      expect(shoppingList.remove).toHaveBeenCalledWith(shoppingItem1);
      expect(itemSlidingSpy.close).toHaveBeenCalled();
      expect(component.presentToast).toHaveBeenCalled();
    });
  }));

  it('should add favourite', () => {
    const itemSlidingSpy = jasmine.createSpyObj('ItemSliding', ['close']);
    itemSlidingSpy.close.and.returnValue(Promise.resolve());

    fixture.whenRenderingDone().then(() => {

      const favList: FavouritesListService = TestBed.get(FavouritesListService);
      spyOn(favList, 'add');

      spyOn(component, 'presentToast');

      component.addFavourite(shoppingItem1, itemSlidingSpy);

      expect(favList.add).toHaveBeenCalledWith(shoppingItem1);
      expect(itemSlidingSpy.close).toHaveBeenCalled();
      expect(component.presentToast).toHaveBeenCalled();
    });
  });

  it('should remove favourite', () => {
    const slidingitem = jasmine.createSpyObj('ItemSliding', ['close']);
    slidingitem.close.and.returnValue(Promise.resolve());

    fixture.whenRenderingDone().then(() => {

      const favlist: FavouritesListService = TestBed.get(FavouritesListService);
      spyOn(favlist, 'remove');
      spyOn(component, 'presentToast');

      component.removeFavourite(favShoppingItem1, slidingitem);

      expect(favlist.remove).toHaveBeenCalled();
      expect(slidingitem.close).toHaveBeenCalled();
      expect(component.presentToast).toHaveBeenCalled();
    });
  });

  it('should get zero filtered favourites', () => {

    const event = {
      target: {
        value: ''
      }
    };

    fixture.whenStable().then(() => {
      const favlist: FavouritesListService = TestBed.get(FavouritesListService);
      spyOn(favlist, 'get').and.returnValue(favListStub);

      component.getFavourites(event);

      expect(favlist.get).toHaveBeenCalled();
      expect(component.favouritesFiltered.length).toBe(0);
    });
  });

  it('should get filtered favourites', () => {

    const event = {
      target: {
        value: 'bread'
      }
    };

    fixture.whenStable().then(() => {
      const favlist: FavouritesListService = TestBed.get(FavouritesListService);
      spyOn(favlist, 'get').and.returnValue(favListStub);

      component.getFavourites(event);

      expect(favlist.get).toHaveBeenCalled();

      expect(component.favouritesFiltered.length).toBe(1);
    });
  });

  it('should reorder items', () => {

    const reorder = {
      detail: {
        from: 0,
        to: 1,
        complete: () => {}
      }
    };

    fixture.whenRenderingDone().then(() => {
      const shoppingList: ShoppingListService = TestBed.get(ShoppingListService);
      spyOn(shoppingList, 'reorderItems');

      component.reorderItems(reorder);

      expect(shoppingList.reorderItems).toHaveBeenCalledWith(reorder.detail.from, reorder.detail.to);
    });
  });

  xit('should present toast message', async(() => {

    fixture.whenRenderingDone().then(() => {
      component.presentToast('item added');

      expect(toastSpy.present).toHaveBeenCalled();
    });
  }));
});
