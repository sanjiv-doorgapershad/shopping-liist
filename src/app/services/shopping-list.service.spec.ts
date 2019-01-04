import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';
import { Storage } from '@ionic/storage';
import { ShoppingItem } from '../models/shopping-item';

let mockFavListData: ShoppingItem[];


describe('ShoppingListService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', ['get', 'set']);
    spy.get.and.returnValue(Promise.resolve(mockFavListData));
    spy.set.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [ { provide: Storage, useValue: spy }]
    });
  });


  it('should be created', () => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);
    expect(service).toBeTruthy();
  });

  it('should have empty list', fakeAsync(() => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);

    tick();

    const items = service.get();
    expect(items.length).toBe(0);
  }));

  it('should add to the list', fakeAsync(() => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);

    tick();

    let items = service.get();
    const itemCount = items.length;

    service.add(new ShoppingItem());
    items = service.get();

    expect(items.length).toBe(itemCount + 1);
  }));

  it('should remove from the list', fakeAsync(() => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);

    tick();

    const item = new ShoppingItem();
    item.name = 'Bread';

    service.add(item);
    let items = service.get();
    const itemCount = items.length;

    service.remove(item);
    items = service.get();

    expect(items.length).toBe(itemCount - 1);
  }));

  it('should clear the list', fakeAsync(() => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);

    tick();

    const item = new ShoppingItem();
    item.name = 'Bread';

    let items = service.get();
    const itemCount = items.length;

    service.add(item);
    items = service.get();
    expect(items.length).toBe(itemCount + 1);

    service.clear();
    items = service.get();

    expect(items.length).toBe(0);
  }));


  it('should reorder items in the list', fakeAsync(() => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);

    tick();

    const item1 = new ShoppingItem();
    item1.name = 'Item1';
    service.add(item1);

    const item2 = new ShoppingItem();
    item2.name = 'Item2';
    service.add(item2);

    const item3 = new ShoppingItem();
    item3.name = 'Item3';
    service.add(item3);

    let items = service.get();
    expect(items.length).toBe(3);

    service.reorderItems(0, 1);
    items = service.get();
    expect(items.length).toBe(3);

    expect(items[0]).toBe(item2);
    expect(items[1]).toBe(item1);
    expect(items[2]).toBe(item3);
  }));

});
