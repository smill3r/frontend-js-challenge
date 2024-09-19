import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent!: ToastComponent;

  setToastComponent(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  showSuccess(message: string) {
    this.toastComponent.showToast(message, 'success');
  }

  showError(message: string) {
    this.toastComponent.showToast(message, 'error');
  }

  showInfo(message: string) {
    this.toastComponent.showToast(message, 'info');
  }
}
