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
  myFavourites: any[] = [];
  @Input() mealData: any;
  @Input() displayRecipie: boolean = true;
  @Input() favourite: boolean = false;

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

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const stored = localStorage.getItem('favourites');
    const existingFavourites = stored ? JSON.parse(stored) : [];
    this.favourite = existingFavourites.includes(this.mealData.id);
  }

  selectMealID(value?: any) {
    this.selectedMeal.emit(value);
  }

  openDetails() {
    if (this.displayRecipie) {
      this.router.navigate(['/recipeDetail', this.mealData.id]);
    }
  }
  toggleMealToFavourite() {
    const stored = localStorage.getItem('favourites');
    let existingFavourites = stored ? JSON.parse(stored) : [];

    const mealIndex = existingFavourites.indexOf(this.mealData.id);

    if (mealIndex > -1) {
      // Already exists – remove it
      existingFavourites.splice(mealIndex, 1);
      this.favourite = false;
      this.favToggle.emit({ toggle: false });
    } else {
      // Not in favourites – add it
      existingFavourites.push(this.mealData.id);
      this.favourite = true;
      this.favToggle.emit({ toggle: true });
    }

    this.myFavourites = existingFavourites;
    localStorage.setItem('favourites', JSON.stringify(existingFavourites));
  }
}
