import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  imports: [CommonModule],
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  // public props
  @Input() type!: string;
  @Input() dismiss!: string;

  // public method
  dismissAlert(element: { remove: () => void }) {
    element.remove();
  }
}