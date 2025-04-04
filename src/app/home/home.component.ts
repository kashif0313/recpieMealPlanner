import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  gridView: boolean = true;
  openWeekMealModel: boolean = false;
  currentDay: string = '';

  savedRecipes: any;
  week: any = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  };
  async ngOnInit(): Promise<void> {
    await this.loadRecipes();
    await this.loadWeekMeals();
  }
  changeListingView() {
    this.gridView = !this.gridView;
  }
  // Load recipes from localStorage
  loadRecipes() {
    console.log('loading recipies ...');
    this.savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    this.recipes = this.savedRecipes;
  }
  weekKeys = Object.keys(this.week);
  loadWeekMeals() {
    // Loop through each day of the week and fetch stored recipes
    Object.keys(this.week).forEach((day) => {
      const storedMeal = localStorage.getItem(day + '_recipie');
      this.week[day] = storedMeal ? JSON.parse(storedMeal) : ''; // Assign meal data if found, otherwise keep it empty
    });

    console.log('Loaded Week Meals:', this.week);
  }
  addWeekMeal(day: string) {
    this.currentDay = day;
    this.openWeekMealModel = true;
  }
  confirmAction(data: any) {
    console.log('model data == ', data);
    if (data.confirm == true) {
      let selectedRecipe = this.recipes.find(
        (recipe: any) => recipe.id === data.mealId
      );
      localStorage.setItem(
        this.currentDay + '_recipie',
        JSON.stringify(selectedRecipe)
      );
    }

    this.openWeekMealModel = false;
    this.loadWeekMeals();
  }
}
