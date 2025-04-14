import { Component } from '@angular/core';

@Component({
  selector: 'app-my-recipe',
  standalone: false,
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.css',
})
export class MyRecipeComponent {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  selectedCategory = 'All';
  categories = ['All', 'Breakfast', 'Lunch', 'Dinner']; // Category list
  gridView: boolean = true;

  async ngOnInit(): Promise<void> {
    await this.loadRecipes();
    this.filterListing('All');
  }
  changeListingView() {
    this.gridView = false;
  }
  changeGridView() {
    this.gridView = true;
  }
  // Load recipes from localStorage
  loadRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    this.recipes = savedRecipes;
  }
  filterListing(filter: string) {
    this.selectedCategory = filter; // Set active category
    this.filteredRecipes =
      filter === 'All'
        ? this.recipes
        : this.recipes.filter((recipe: any) => recipe.category === filter);
  }
}
