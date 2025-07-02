import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-navigation',
  standalone: false,
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.css',
})
export class MobileNavigationComponent {
  @Output() toggle = new EventEmitter<boolean>();
  @Input() collapsed = true;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.toggle.emit(this.collapsed);
  }
  closeSidebar() {
    this.collapsed = true;
  }
}
