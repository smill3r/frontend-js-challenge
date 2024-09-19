import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button type="button" class="trend__action" (click)="editTrend()">
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button type="button" class="trend__action">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>

    <app-trend-compose
      *ngIf="this.composeTrendVisible"
      (close)="modalClosed()"
    >
    </app-trend-compose>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  edit = false;
  composeTrendVisible = false;

  constructor(private store: Store) {
    this.trend$.subscribe(console.log)
  }

  editTrend() {
    this.edit = true;
    this.composeTrendVisible = true;
  }

  modalClosed() {
    this.composeTrendVisible = false;
  }
}
