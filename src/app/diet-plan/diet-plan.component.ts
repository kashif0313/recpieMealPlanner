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
    this.router.navigate(['dietPlanDetails', dietId]);
  }
  async ngOnInit(): Promise<void> {
    await this.loadRecipes();
  }

  loadRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('dietPlans') || '[]');
    this.recipes = savedRecipes;
  }
  showDeleteModal = false;
  recipeToDelete: string | null = null;

  deleteModal(recipeId: string) {
    this.recipeToDelete = recipeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.recipeToDelete) return;

    const savedRecipes = JSON.parse(localStorage.getItem('dietPlans') || '[]');
    const updatedRecipes = savedRecipes.filter(
      (recipe: any) => recipe.id !== this.recipeToDelete
    );
    localStorage.setItem('dietPlans', JSON.stringify(updatedRecipes));
    this.recipes = updatedRecipes;

    this.showDeleteModal = false;
    this.recipeToDelete = null;
  }
}
