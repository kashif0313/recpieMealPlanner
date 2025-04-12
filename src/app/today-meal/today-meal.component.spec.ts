import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayMealComponent } from './today-meal.component';

describe('TodayMealComponent', () => {
  let component: TodayMealComponent;
  let fixture: ComponentFixture<TodayMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayMealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
