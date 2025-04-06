import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-card',
  standalone: false,
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css',
})
export class MealCardComponent implements OnInit {
  selectedMealId: string = '';

  @Input() mealData: any;
  @Input() displayRecipie: boolean = true;
  @Input() favourite: boolean = false;

  @Output() selectedMeal: EventEmitter<{
    mealId: string;
  }> = new EventEmitter<{
    mealId: string;
  }>();

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    console.log('meal ==', this.mealData);
  }

  selectMealID(value?: any) {
    console.log('meal selected radio id = ', value);
    this.selectedMeal.emit(value);
  }

  openDetails() {
    if (this.displayRecipie) {
      this.router.navigate(['/recipeDetail', this.mealData.id]);
    }
  }
}
