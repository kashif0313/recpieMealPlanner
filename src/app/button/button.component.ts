import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: false,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() successBtn: boolean = false;
  @Input() normalBtn: boolean = false;
  @Input() failBtn: boolean = false;
  @Input() widthFull: boolean = false;
  @Input() disabled: boolean = false;
  @Input() mobAdd: boolean = false;
  @Input() type: string = 'button';

  @Output() onClick = new EventEmitter<Event>();

  onKeyDown(event: any) {
    if (event.key === 'Enter' && !this.disabled) {
      this.onClick.emit(event);
    }
  }
}
