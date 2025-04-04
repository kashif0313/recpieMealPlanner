import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-list',
  standalone: false,
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  @Input() mealData: any;

  async ngOnInit(): Promise<void> {
    console.log('meal list ==', this.mealData);
  }
}
