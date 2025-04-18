import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { predefinedRecipes } from '../helper/recipies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  recipes: any[] = [];
  savedRecipes: any[] = [];
  filteredResults: any[] = [];
  @Output() toggle = new EventEmitter<boolean>();
  @Input() collapsed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadRecipes();

    const savedSearch = sessionStorage.getItem('searchQuery');
    if (savedSearch) {
      this.searchQuery = savedSearch;
      this.searchRecipes();
    }
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.toggle.emit(this.collapsed);
  }

  loadRecipes() {
    const existing = localStorage.getItem('recipes');

    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem('recipes', JSON.stringify(predefinedRecipes));
      this.recipes = predefinedRecipes;
      this.savedRecipes = predefinedRecipes;
    } else {
      this.savedRecipes = JSON.parse(existing);
      this.recipes = this.savedRecipes;
    }
  }

  searchRecipes() {
    sessionStorage.setItem('searchQuery', this.searchQuery);

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredResults = this.savedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );

    // Optional: Update recipes only if you want the main list to change
    this.recipes = this.filteredResults;
  }

  selectRecipe(recipe: any) {
    // Example: Navigate or update selected view
    console.log('Selected:', recipe);
    this.searchQuery = recipe.name;
    sessionStorage.setItem('searchQuery', recipe.name);
    this.router.navigate(['/recipeDetail', recipe.id]);
    this.filteredResults = [];
  }
  clearSearch() {
    this.searchQuery = '';
    this.filteredResults = [];
    sessionStorage.removeItem('searchQuery');
  }
}
