import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-today-meal-details',
  standalone: false,
  templateUrl: './today-meal-details.component.html',
  styleUrl: './today-meal-details.component.css',
})
export class TodayMealDetailsComponent {
  @Input() showMealModal = true;
  @Input() popupData: any;
  recipes: any;
  selectedMealType: string = '';
  selectedMealList: any[] = [];

  @Output() confirmAction: EventEmitter<any> = new EventEmitter<any>();

  closePoopup() {
    this.confirmAction.emit({
      confirm: false,
    });
  }
}
