import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { FavouritesListService } from './favourites-list.service';
import { ShoppingItem } from '../models/shopping-item';
import { of } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';

let favListService: FavouritesListService;
let storageServiceSpy: jasmine.SpyObj<Storage>;
let mockFavListData: ShoppingItem[];

describe('FavouritesListService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set']);
    spy.get.and.returnValue(Promise.resolve(mockFavListData));
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

    const item = new ShoppingItem();
    item.name = 'Bread';

    favListService.add(item);

    let favList = favListService.get();
    const currentItemCount = favList.length;

    favListService.remove(item);

    favList = favListService.get();

    expect(favList.length).toBe(currentItemCount - 1);
  }));
});
