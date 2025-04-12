import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayMealDetailsComponent } from './today-meal-details.component';

describe('TodayMealDetailsComponent', () => {
  let component: TodayMealDetailsComponent;
  let fixture: ComponentFixture<TodayMealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayMealDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayMealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
