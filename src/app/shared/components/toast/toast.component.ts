import { Component } from '@angular/core';

type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast',
  template: `<div class="toast-container" *ngIf="show">
    <div class="toast" [ngClass]="type">
      {{ message }}
      <button class="close-btn" (click)="hide()">x</button>
    </div>
  </div>`,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  show = false;
  message = '';
  type:  ToastType = 'success';

  constructor() {}

  showToast(message: string, type: ToastType = 'success') {
    this.message = message;
    this.type = type;
    this.show = true;

    // Add the show class to animate
    setTimeout(() => {
      document.querySelector('.toast')?.classList.add('show');
    }, 10); // Delay for the animation to apply after rendering

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    // Remove the show class for hide animation
    document.querySelector('.toast')?.classList.remove('show');

    // Wait for the animation to finish before actually hiding the toast
    setTimeout(() => {
      this.show = false;
    }, 500); // Match the transition duration
  }
}
