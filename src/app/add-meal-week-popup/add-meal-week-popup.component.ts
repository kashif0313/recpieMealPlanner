import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-meal-week-popup',
  standalone: false,
  templateUrl: './add-meal-week-popup.component.html',
  styleUrl: './add-meal-week-popup.component.css',
})
export class AddMealWeekPopupComponent implements OnInit {
  recipes: any[] = [];

  selectedMealId: string = '';
  async ngOnInit(): Promise<void> {
    await this.loadRecipes();
  }

  @Output() confirmAction: EventEmitter<any> = new EventEmitter<any>();

  loadRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    this.recipes = savedRecipes;
  }
  selectedMealFunction(data: any) {
    this.selectedMealId = data;
  }

  closePoopup() {
    this.confirmAction.emit({
      confirm: false,
    });
  }
  addMealToWeek() {
    this.confirmAction.emit({
      confirm: true,
      mealId: this.selectedMealId,
    });
  }
}
