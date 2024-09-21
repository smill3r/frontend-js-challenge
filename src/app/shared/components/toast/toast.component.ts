import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast',
  template: `<div class="toast-container" *ngIf="show" @toastAnimation>
    <div class="toast" [ngClass]="type">
      {{ message }}
      <button class="close-btn" (click)="hide()">x</button>
    </div>
  </div>`,
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ToastComponent {
  show = false;
  message = '';
  type: ToastType = 'success';

  constructor() {}

  showToast(message: string, type: ToastType = 'success') {
    this.message = message;
    this.type = type;
    this.show = true;

    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  hide() {
    document.querySelector('.toast')?.classList.remove('show');

    setTimeout(() => {
      this.show = false;
    }, 500);
  }
}
