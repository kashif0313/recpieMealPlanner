import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealWeekPopupComponent } from './add-meal-week-popup.component';

describe('AddMealWeekPopupComponent', () => {
  let component: AddMealWeekPopupComponent;
  let fixture: ComponentFixture<AddMealWeekPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMealWeekPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMealWeekPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
