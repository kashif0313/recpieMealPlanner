import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() toggle = new EventEmitter<boolean>();
  @Input() collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.toggle.emit(this.collapsed);
  }
}
