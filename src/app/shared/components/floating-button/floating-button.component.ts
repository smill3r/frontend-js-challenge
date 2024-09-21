import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  template: ` <button class="close-btn" (click)="handleClick()">
    <ng-content></ng-content>
  </button>`,
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButton {
  @Output() floatingButtonClicked: EventEmitter<boolean> = new EventEmitter();

  handleClick() {
    this.floatingButtonClicked.emit();
  }
}
