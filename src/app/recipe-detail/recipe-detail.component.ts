import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipes: any;
  selectedRecipe: any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('object'); // Make sure this matches your route parameter
      if (recipeId) {
        this.loadRecipes(recipeId);
      }
    });
  }

  loadRecipes(recipeId: string) {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    this.recipes = savedRecipes;

    // Find the recipe with the matching ID
    this.selectedRecipe = this.recipes.find(
      (recipe: any) => recipe.id === recipeId
    );
  }
}
