import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMealComponent } from './add-meal/add-meal.component';
import { HomeComponent } from './home/home.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { AddDietPlanComponent } from './add-diet-plan/add-diet-plan.component';
import { DietPlanDetailsComponent } from './diet-plan-details/diet-plan-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'myRecipie', component: MyRecipeComponent },
  { path: 'addRecipie', component: AddMealComponent },
  // { path: 'mealPlans', component: MyRecipeComponent },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: 'recipeDetail/:object', component: RecipeDetailComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'dietPlan', component: DietPlanComponent },
  { path: 'addDietPlan', component: AddDietPlanComponent },
  { path: 'dietPlanDetails/:object', component: DietPlanDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
