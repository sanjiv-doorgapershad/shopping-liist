import { TestBed } from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';
import { Storage } from '@ionic/storage';

describe('ShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [Storage]
  }));

  it('should be created', () => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);
    expect(service).toBeTruthy();
  });
});
