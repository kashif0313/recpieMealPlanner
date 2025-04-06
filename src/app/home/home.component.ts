import { Component, OnInit } from '@angular/core';
import { predefinedRecipes } from '../helper/recipies';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  gridView: boolean = true;

  savedRecipes: any;

  async ngOnInit(): Promise<void> {
    await this.loadRecipes();
  }
  // Load recipes from localStorage
  loadRecipes() {
    console.log('loading recipes...');

    const existing = localStorage.getItem('recipes');

    if (!existing || JSON.parse(existing).length === 0) {
      // If no recipes in localStorage, use predefined and store them
      localStorage.setItem('recipes', JSON.stringify(predefinedRecipes));
      this.recipes = predefinedRecipes;
      this.savedRecipes = predefinedRecipes;
      console.log('Predefined recipes loaded into localStorage.');
    } else {
      // Load from localStorage
      this.savedRecipes = JSON.parse(existing);
      this.recipes = this.savedRecipes;
      console.log('Recipes loaded from localStorage.');
    }
  }
}
