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
  }
  downloadPlan(): void {
    let textContent = `Meal Plan: ${this.selectedRecipe?.title}\n`;
    textContent += `Duration: ${this.selectedRecipe?.days} days\n`;
    textContent += `Calories per Day: ${this.getCaloriesPerDay(
      this.selectedRecipe?.nutrition?.calories,
      this.selectedRecipe?.days
    )} kcal\n\n`;

    textContent += `Nutrition Goals:\n`;
    textContent += `- Fat: ${this.allMeals?.nutrition?.fat}g\n`;
    textContent += `- Protein: ${this.allMeals?.nutrition?.protein}g\n`;
    textContent += `- Carbs: ${this.allMeals?.nutrition?.carbs}g\n\n`;

    textContent += `Weekly Meal Schedule:\n`;

    this.allMeals?.mealsPerDay?.forEach((day: any, index: number) => {
      textContent += `\nDay ${index + 1} - ${day.date}\n`;

      ['Breakfast', 'Lunch', 'Snack', 'Dinner'].forEach((mealType) => {
        textContent += `  ${mealType}:\n`;

        const items = day.meals[mealType];
        if (items && items.length > 0) {
          items.forEach((item: any) => {
            textContent += `    - ${item.name}${
              item.qty ? ` (${item.qty})` : ''
            }\n`;
          });
        } else {
          textContent += `    - No items listed\n`;
        }
      });
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `meal-plan-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
