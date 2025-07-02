import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  standalone: false,
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent {
  favouriteMeals: any[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadFavouritesFromRecipes(); // now you have full objects of favorite meals
  }

  loadFavouritesFromRecipes(newData?: any) {
    console.log('loading new data');
    let favouriteIds: string[] = JSON.parse(
      localStorage.getItem('favourites') || '[]'
    );
    if (newData) {
      favouriteIds = newData;
    }
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');

    // Get full objects of the favorite meals
    this.favouriteMeals = savedRecipes.filter((meal: any) =>
      favouriteIds.includes(meal.id)
    );
    console.log('fav meal == ', this.favouriteMeals);
  }
  listenFavChange(data: any) {
    console.log('fav ==', data);
    this.loadFavouritesFromRecipes(data.data);
  }
}
