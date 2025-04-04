import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nutrientDatabase } from '../helper/ingredients';

@Component({
  selector: 'app-add-meal',
  standalone: false,
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css',
})
export class AddMealComponent implements OnInit {
  constructor(private router: Router) {}
  filteredIngredients: string[] = [];
  ngOnInit() {
    // Initialize filtered ingredients with all keys in nutrientDatabase
    this.filteredIngredients = Object.keys(nutrientDatabase);
  }

  // Recipe structure
  recipe = {
    id: this.generateRandomId(),
    name: '',
    prepTime: null,
    difficulty: '',
    serving: 1, // changed from string 'Easy' to number for servings
    category: 'Breakfast',
    image: '' as string | null,
    ingredients: [] as { name: string; qty: number | null; unit: string }[],
    instructions: '',
    nutrition: {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  };

  newIngredient = {
    name: '',
    qty: null,
    unit: '',
  };

  imagePreview: string | null = null;

  generateRandomId(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  // Handle image input (file select or drag and drop)
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  // Handle drag and drop
  handleDragOver(event: any) {
    event.preventDefault(); // Prevent default to allow drop
  }

  handleDrop(event: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  // Image preview handler
  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Add new ingredient to the recipe
  addIngredient() {
    if (
      this.newIngredient.name &&
      this.newIngredient.qty &&
      this.newIngredient.unit
    ) {
      this.recipe.ingredients.push({ ...this.newIngredient }); // Push a copy of the ingredient
      this.newIngredient = { name: '', qty: null, unit: '' }; // Clear the input fields
    }
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }
  // Save the recipe (submit form)
  saveRecipe() {
    this.recipe.image = this.imagePreview;

    // Nutrition totals
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    this.recipe.ingredients.forEach((ingredient) => {
      const key = ingredient.name
        .toLowerCase()
        .replace(/\s+/g, '_') as keyof typeof nutrientDatabase;
      const match = nutrientDatabase[key];

      if (match && ingredient.qty) {
        const amount = ingredient.qty;

        // Basic unit conversion (you can customize this further)
        let factor = 0;
        switch (ingredient.unit) {
          case 'g':
            factor = amount / 100;
            break;
          case 'kg':
            factor = amount * 10;
            break;
          case 'ml':
            factor = amount / 100;
            break;
          case 'tbsp':
            factor = amount * 0.15;
            break; // ~15g
          case 'tsp':
            factor = amount * 0.05;
            break; // ~5g
          case 'cup':
            factor = amount * 2.4;
            break; // ~240g / 100 = 2.4
          case 'piece':
            factor = amount;
            break; // assuming 1 piece = full nutrient
          default:
            factor = 0;
        }

        totalCalories += match.calories * factor;
        totalProtein += match.protein * factor;
        totalFat += match.fat * factor;
        totalCarbs += match.carbs * factor;
      }
    });

    const servings = this.recipe.serving || 1; // default to 1 if not set

    // Attach per-serving nutrition info
    this.recipe.nutrition = {
      calories: Math.round(totalCalories / servings),
      protein: +(totalProtein / servings).toFixed(1),
      fat: +(totalFat / servings).toFixed(1),
      carbs: +(totalCarbs / servings).toFixed(1),
    };

    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    savedRecipes.push(this.recipe);
    localStorage.setItem('recipes', JSON.stringify(savedRecipes));

    console.log('Meals:', savedRecipes);
    this.router.navigate(['/']);
  }

  // Filter ingredients based on input search query
  filterIngredients() {
    const query = this.newIngredient.name.toLowerCase();
    this.filteredIngredients = Object.keys(nutrientDatabase).filter(
      (ingredient) => ingredient.toLowerCase().includes(query)
    );
  }

  // Called when user clicks an item
  selectIngredient(ingredient: string) {
    this.newIngredient.name = ingredient;
    this.filteredIngredients = []; // Close dropdown
  }
}
