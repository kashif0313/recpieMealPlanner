import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { ButtonComponent } from './button/button.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AddMealWeekPopupComponent } from './add-meal-week-popup/add-meal-week-popup.component';
import { WeekPlanComponent } from './week-plan/week-plan.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { FavouritesComponent } from './favourites/favourites.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { AddDietPlanComponent } from './add-diet-plan/add-diet-plan.component';
import { DietPlanDetailsComponent } from './diet-plan-details/diet-plan-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodayMealComponent } from './today-meal/today-meal.component';
import { TodayMealDetailsComponent } from './today-meal-details/today-meal-details.component';
import { MobileNavigationComponent } from './mobile-navigation/mobile-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    MealCardComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    AddMealComponent,
    ButtonComponent,
    MyRecipeComponent,
    MealListComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    AddMealWeekPopupComponent,
    WeekPlanComponent,
    FavouritesComponent,
    DietPlanComponent,
    AddDietPlanComponent,
    DietPlanDetailsComponent,
    TodayMealComponent,
    TodayMealDetailsComponent,
    MobileNavigationComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ImageCropperComponent,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
