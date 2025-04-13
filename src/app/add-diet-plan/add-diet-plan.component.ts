import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-diet-plan',
  standalone: false,
  templateUrl: './add-diet-plan.component.html',
  styleUrl: './add-diet-plan.component.css',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({ height: '0px', opacity: 0, overflow: 'hidden', padding: '0' })
      ),
      state('expanded', style({ height: '*', opacity: 1, overflow: 'auto' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AddDietPlanComponent {
  constructor(private router: Router) {}
  dietDays: string = '3';
  customDays = false;
  customDaysNumber = 1;
  totalDays: number = 3;
  planTitle = '';
  dietTitle: string = '';
  recipeList: any[] = [];
  mealSlots = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
  daysForm: any[] = [];
  dietPlans: any[] = [];

  ngOnInit() {
    this.loadRecipes();
    this.generateDays();
  }

  generateRandomId(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  checkDaysNo() {
    this.customDays = this.dietDays === 'custom';
    this.totalDays = this.customDays
      ? this.customDaysNumber
      : parseInt(this.dietDays, 10);
    this.generateDays();
  }

  generateDays() {
    this.daysForm = [];
    const today = new Date();

    for (let i = 0; i < this.totalDays; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i); // Increment date

      this.daysForm.push({
        expanded: false,
        id: this.generateRandomId(),
        title: this.dietTitle,
        date: dayDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
        meals: {
          Breakfast: null,
          Lunch: null,
          Snack: null,
          Dinner: null,
        },
      });
    }
  }

  loadRecipes() {
    const stored = localStorage.getItem('recipes');
    if (stored) {
      this.recipeList = JSON.parse(stored);
    }
  }

  toggleDay(index: number) {
    this.daysForm[index].expanded = !this.daysForm[index].expanded;
  }

  updateCustomDays() {
    this.totalDays = this.customDaysNumber;
    this.generateDays();
  }

  calculateTotalNutrition(days: any[]): {
    fat: number;
    protein: number;
    carbs: number;
    calories: number;
  } {
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalCalories = 0;

    days.forEach((day) => {
      const meals = day.meals;

      Object.values(meals).forEach((mealList: any) => {
        if (Array.isArray(mealList)) {
          mealList.forEach((item: any) => {
            const nutrition = item?.selectedRecipe?.nutrition;
            if (nutrition) {
              totalFat += nutrition.fat || 0;
              totalProtein += nutrition.protein || 0;
              totalCarbs += nutrition.carbs || 0;
              totalCalories += nutrition.calories || 0;
            }
          });
        }
      });
    });

    return {
      fat: parseFloat(totalFat.toFixed(2)),
      protein: parseFloat(totalProtein.toFixed(2)),
      carbs: parseFloat(totalCarbs.toFixed(2)),
      calories: parseFloat(totalCalories.toFixed(2)),
    };
  }

  saveDietPlan() {
    const nutrition = this.calculateTotalNutrition(this.daysForm);

    const newPlan = {
      id: this.generateRandomId(8),
      title: this.planTitle,
      days: this.totalDays,
      mealsPerDay: this.daysForm,
      nutrition: nutrition,
    };

    this.dietPlans.push(newPlan);
    localStorage.setItem('dietPlans', JSON.stringify(this.dietPlans));
    this.router.navigate(['dietPlan']);
    console.log('Diet plan saved:', newPlan);
  }

  addMealItem(dayIndex: number, slot: string) {
    const day = this.daysForm[dayIndex];
    if (!day.meals[slot]) {
      day.meals[slot] = [];
    }
    day.meals[slot].push({
      selectedRecipe: null,
      name: '',
      qty: '',
    });
  }

  removeMealItem(dayIndex: number, slot: string, itemIndex: number) {
    const day = this.daysForm[dayIndex];
    if (day.meals[slot]) {
      day.meals[slot].splice(itemIndex, 1);
    }
  }

  // If a recipe is selected, fill its name (unless custom)
  setSelectedRecipe(dayIndex: number, slot: string, itemIndex: number) {
    const item = this.daysForm[dayIndex].meals[slot][itemIndex];
    if (item.selectedRecipe && !item.selectedRecipe.isCustom) {
      item.name = item.selectedRecipe.name;
    } else {
      item.name = '';
    }
  }
}
