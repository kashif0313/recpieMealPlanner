import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-meal-list',
  standalone: false,
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  @Input() mealData: any;
  @Input() displayRecipie: boolean = true;

  @Output() selectedMeal: EventEmitter<{
    mealId: string;
  }> = new EventEmitter<{
    mealId: string;
  }>();

  @Output() favToggle: EventEmitter<{
    toggle: boolean;
  }> = new EventEmitter<{
    toggle: boolean;
  }>();

  async ngOnInit(): Promise<void> {}
  selectMealID(value?: any) {
    this.selectedMeal.emit(value);
  }
}
