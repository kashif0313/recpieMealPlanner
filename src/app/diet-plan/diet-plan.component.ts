import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diet-plan',
  standalone: false,
  templateUrl: './diet-plan.component.html',
  styleUrl: './diet-plan.component.css',
})
export class DietPlanComponent implements OnInit {
  constructor(private router: Router) {}
  recipes: any[] = [];
  openDetails(dietId: string) {
    this.router.navigate(['dietPlanDetails']);
    this.router.navigate(['dietPlanDetails', dietId]);
  }
  async ngOnInit(): Promise<void> {
    await this.loadRecipes();
  }

  loadRecipes() {
    console.log('loading recipies ...');
    const savedRecipes = JSON.parse(localStorage.getItem('dietPlans') || '[]');
    this.recipes = savedRecipes;
    console.log('savedRecipes == ', savedRecipes);
  }
}
