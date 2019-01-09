import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { FavouritesListService } from './favourites-list.service';
import { ShoppingItem } from '../models/shopping-item';

let favListService: FavouritesListService;
let storageServiceSpy: jasmine.SpyObj<Storage>;

const mockFavListData = new Array<ShoppingItem>();

const favShoppingItem1 = new ShoppingItem();
favShoppingItem1.name = 'fav_Bread';
favShoppingItem1.isFavourite = true;

const favShoppingItem2 = new ShoppingItem();
favShoppingItem2.name = 'fav_Milk';
favShoppingItem2.isFavourite = true;

mockFavListData.push(favShoppingItem1);
mockFavListData.push(favShoppingItem2);

describe('FavouritesListService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set']);
    spy.get.and.returnValue(Promise.resolve());
    spy.set.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
        providers: [
          FavouritesListService,
          { provide: Storage, useValue: spy }
        ]
    });
  });

  it('should be created', () => {
    favListService = TestBed.get(FavouritesListService);
    expect(favListService).toBeTruthy();
  });

  xit('should use exiting list from storage', fakeAsync(() => {
    const storage = TestBed.get(Storage);
    spyOn(storage, 'get').and.returnValue(mockFavListData);
    spyOn(storage, 'set').and.returnValue(Promise.resolve());

    favListService = TestBed.get(FavouritesListService);
    tick();

    const favList = favListService.get();
    expect(favList).toBeTruthy();
    expect(favList.length).toBe(2);
  }));

  it('should return empty list', fakeAsync(() => {
    favListService = TestBed.get(FavouritesListService);
    tick();

    const favList = favListService.get();
    expect(favList).toBeTruthy();
    expect(favList.length).toBe(0);
  }));

  it('should add item to list', fakeAsync(() => {
    favListService = TestBed.get(FavouritesListService);
    tick();

    let favList = favListService.get();
    const currentItemCount = favList.length;

    favListService.add(new ShoppingItem());

    favList = favListService.get();
    expect(favList.length).toBe(currentItemCount + 1);
  }));

  it('should remove item from list', fakeAsync(() => {
    favListService = TestBed.get(FavouritesListService);
    tick();

    favListService.add(favShoppingItem1);

    const favList = favListService.get();
    const currentItemCount = favList.length;

    favListService.remove(favShoppingItem1);

    expect(favList.length).toBe(currentItemCount - 1);
  }));

  it('should not remove any item not in list', fakeAsync(() => {
    favListService = TestBed.get(FavouritesListService);
    tick();

    favListService.add(favShoppingItem1);

    const favList = favListService.get();
    const currentItemCount = favList.length;

    favListService.remove(favShoppingItem2);

    expect(favList.length).toBe(currentItemCount);
  }));
});
