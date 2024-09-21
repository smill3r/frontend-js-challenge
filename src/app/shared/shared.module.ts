import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingButton } from './components/floating-button/floating-button.component';
import { ToastComponent } from './components/toast/toast.component';
import { TrendComposeComponent } from './components/trend-compose/trend-compose.component';
import { ToastService } from './services/toast.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FloatingButton, ToastComponent, TrendComposeComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ToastService],
  exports: [FloatingButton, ToastComponent, TrendComposeComponent],
})
export class SharedModule {}
