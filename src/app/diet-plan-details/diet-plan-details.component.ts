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
  allMeals: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('object'); // Make sure this matches your route parameter
      if (recipeId) {
        this.loadRecipes(recipeId);
      }
    });
  }
  expandedDay: number | null = 0;

  toggleDay(index: number) {
    this.expandedDay = this.expandedDay === index ? null : index;
  }
  nutritionGoals = {
    fat: 70, // grams
    protein: 120, // grams
    carbs: 300, // grams
  };
  getPercentage(current: number, goal: number): number {
    return Math.min((current / goal) * 100, 100);
  }
  getCaloriesPerDay(totalCalories: number, days: number): number {
    if (!days || days === 0) return 0;
    return Math.round(totalCalories / days);
  }

  loadRecipes(recipeId: string) {
    console.log('Loading recipes...');
    const savedRecipes = JSON.parse(localStorage.getItem('dietPlans') || '[]');
    this.recipes = savedRecipes;

    // Find the recipe with the matching ID
    this.selectedRecipe = this.recipes.find(
      (recipe: any) => recipe.id === recipeId
    );
    this.allMeals = this.selectedRecipe;

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
