import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  template: `
    <app-progress-bar
      *ngIf="isLoading$ | async"
      class="app-progress-bar"
    ></app-progress-bar>
    <header class="app-header">
      <a routerLink="/">
        <img
          *ngIf="isSmallScreen$ | async"
          class="app-logo"
          src="assets/Logos/aTrendsPRO.svg"
          alt="Logo Avantio Trends PRO"
        />
      </a>
      <div class="app-current-date">
        <span>{{ currentDate | date : 'dd MMMM yyyy' }}</span>
      </div>
    </header>
    <nav class="app-navigation">
      <app-menu-small *ngIf="isSmallScreen$ | async"></app-menu-small>
      <app-menu-medium *ngIf="isMediumScreen$ | async"></app-menu-medium>
      <app-menu-large *ngIf="isLargeScreen$ | async"></app-menu-large>
    </nav>
    <main class="app-main-content">
      <router-outlet></router-outlet>
    </main>
    <app-toast></app-toast>
    <app-floating-button (floatingButtonClicked)="createTrend()">
      <img class="white-icon" src="../assets/Iconos/Actions/add.svg" />
    </app-floating-button>
    <app-trend-compose [visible]="this.composeTrendVisible" (close)="modalClosed()">
    </app-trend-compose>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDate = Date.now();
  isSmallScreen$ = this.breakpointsObserver.isSmall$;
  isMediumScreen$ = this.breakpointsObserver.isMedium$;
  isLargeScreen$ = this.breakpointsObserver.isLarge$;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));
  composeTrendVisible = false;

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store,
    private toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.setToastComponent(this.toastComponent);
  }

  createTrend() {
    this.composeTrendVisible = true;
  }

  modalClosed() {
    this.composeTrendVisible = false;
  }
}
