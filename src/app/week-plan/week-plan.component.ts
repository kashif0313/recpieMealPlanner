import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-plan',
  standalone: false,
  templateUrl: './week-plan.component.html',
  styleUrl: './week-plan.component.css',
})
export class WeekPlanComponent implements OnInit {
  openWeekMealModel: boolean = false;
  currentDay: string = '';
  recipes: any[] = [];
  week: any = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  };
  weekKeys = Object.keys(this.week);

  async ngOnInit(): Promise<void> {
    await this.loadWeekMeals();
  }

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
