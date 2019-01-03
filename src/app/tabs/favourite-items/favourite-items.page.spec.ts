import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteItemsPage } from './favourite-items.page';

describe('FavouriteItemsPage', () => {
  let component: FavouriteItemsPage;
  let fixture: ComponentFixture<FavouriteItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteItemsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
});
