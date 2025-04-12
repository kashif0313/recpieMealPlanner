import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diet-plan-details',
  standalone: false,
  templateUrl: './diet-plan-details.component.html',
  styleUrl: './diet-plan-details.component.css',
})
export class DietPlanDetailsComponent implements OnInit {
  recipes: any;
  selectedRecipe: any;
  constructor(private route: ActivatedRoute) {}
  breakfast: any;
  lunch: any;
  snack: any;
  dinner: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('object'); // Make sure this matches your route parameter
      if (recipeId) {
        this.loadRecipes(recipeId);
      }
    });
  }

  loadRecipes(recipeId: string) {
    console.log('Loading recipes...');
    const savedRecipes = JSON.parse(localStorage.getItem('dietPlans') || '[]');
    this.recipes = savedRecipes;

    // Find the recipe with the matching ID
    this.selectedRecipe = this.recipes.find(
      (recipe: any) => recipe.id === recipeId
    );

    if (!this.selectedRecipe) return;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Find today's meal from the diet plan
    const todayMeal = this.selectedRecipe.mealsPerDay.find(
      (day: any) => day.date === today
    );

    if (todayMeal && todayMeal.meals) {
      const meals = todayMeal.meals;
      this.breakfast = meals.Breakfast;
      this.lunch = meals.Lunch;
      this.snack = meals.Snack;
      this.dinner = meals.Dinner;
    } else {
      // If no meals found for today, set all to false
      this.breakfast = false;
      this.lunch = false;
      this.snack = false;
      this.dinner = false;
    }

    console.log('Selected Recipe:', this.selectedRecipe);
    console.log('Today Meal:', todayMeal);
    console.log('Breakfast Meal:', this.breakfast);
    console.log(
      `Breakfast: ${this.breakfast}, Lunch: ${this.lunch}, Snack: ${this.snack}, Dinner: ${this.dinner}`
    );
  }
}
