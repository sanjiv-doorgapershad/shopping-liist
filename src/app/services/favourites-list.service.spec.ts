import { TestBed } from '@angular/core/testing';

import { FavouritesListService } from './favourites-list.service';

describe('FavouritesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavouritesListService = TestBed.get(FavouritesListService);
    expect(service).toBeTruthy();
  });
});
