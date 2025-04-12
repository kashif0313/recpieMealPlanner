import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-meal',
  standalone: false,
  templateUrl: './today-meal.component.html',
  styleUrl: './today-meal.component.css',
})
export class TodayMealComponent implements OnInit {
  breakfast: any;
  lunch: any;
  snack: any;
  dinner: any;
  recipes: any;
  selectedRecipe: any;
  openModelPopup: boolean = false;
  popupData: any;
  today = new Date().toISOString().split('T')[0];
  minDate = new Date().toISOString().split('T')[0]; // today's real date (limit)

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    console.log('Loading recipes...');
    const savedRecipes = JSON.parse(localStorage.getItem('dietPlans') || '[]');
    this.recipes = savedRecipes;

    if (!this.recipes || this.recipes.length === 0) {
      console.warn('No recipes found');
      return;
    }

    // Get today's date in YYYY-MM-DD format

    // Loop through all saved recipes to find one that has today's meals
    let found = false;
    for (const recipe of this.recipes) {
      const todayMeal = recipe.mealsPerDay.find(
        (day: any) => day.date === this.today
      );

      if (todayMeal && todayMeal.meals) {
        this.selectedRecipe = recipe;
        const meals = todayMeal.meals;
        this.breakfast = meals.Breakfast;
        this.lunch = meals.Lunch;
        this.snack = meals.Snack;
        this.dinner = meals.Dinner;

        found = true;

        console.log('Selected Recipe:', this.selectedRecipe);
        console.log('Today Meal:', todayMeal);
        break;
      }
    }

    if (!found) {
      this.breakfast = false;
      this.lunch = false;
      this.snack = false;
      this.dinner = false;
      console.log('No meals found for today in any recipe');
    }

    console.log(
      `Breakfast: ${this.breakfast}, Lunch: ${this.lunch}, Snack: ${this.snack}, Dinner: ${this.dinner}`
    );
  }

  nextDay() {
    const current = new Date(this.today);
    current.setDate(current.getDate() + 1);
    this.today = current.toISOString().split('T')[0];
    console.log('Next date:', this.today);
    this.loadRecipes();
  }

  prevDay() {
    const current = new Date(this.today);
    const min = new Date(this.minDate);

    if (current > min) {
      current.setDate(current.getDate() - 1);
      this.today = current.toISOString().split('T')[0];
      console.log('Previous date:', this.today);
    } else {
      console.log('Cannot go to past dates');
    }
    this.loadRecipes();
  }

  openDetails(type: string) {
    this.openModelPopup = true;

    switch (type) {
      case 'Breakfast':
        this.popupData = this.breakfast;
        break;
      case 'Lunch':
        this.popupData = this.lunch;
        break;
      case 'Snack':
        this.popupData = this.snack;
        break;
      case 'Dinner':
        this.popupData = this.dinner;
        break;
      default:
        this.popupData = [];
    }
    console.log('data == ', this.popupData);
  }
  closePopup() {
    this.openModelPopup = false;
  }
}
