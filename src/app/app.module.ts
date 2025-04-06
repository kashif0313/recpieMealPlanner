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
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ImageCropperComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
