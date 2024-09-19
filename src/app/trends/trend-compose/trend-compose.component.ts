import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Trend } from '../models/trend.model';
import { Store } from '@ngrx/store';
import { updateTrend } from '../store/actions/trends-compose-page.actions';
import { Subscription } from 'rxjs';
import { selectSelectedTrend } from '../store/selectors';
import { PROVIDERS } from '../../shared/constants/providers';

@Component({
  selector: 'app-trend-compose',
  template: `
    <div class="modal__backdrop" (click)="closeModal()"></div>
    <div class="modal__content">
      <header class="modal__header">
        <h3>{{ this.isEdit ? 'Edita la Noticia' : 'Nueva noticia' }}</h3>
        <div>
          <button
            type="button"
            class="app-button app-button--secondary"
            (click)="closeModal()"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="app-button app-button--primary"
            (click)="saveTrend()"
          >
            Guardar
          </button>
        </div>
      </header>

      <form class="modal__body" [formGroup]="trendForm">
        <label for="url">URL: </label>
        <input id="url" type="text" formControlName="url" />

        <label for="image">Image: </label>
        <input id="image" type="text" formControlName="image" />

        <label for="provider">Proveedor: </label>
        <select id="provider" formControlName="provider">
          <option *ngFor="let provider of providers" [value]="provider.value">
            {{ provider.name }}
          </option>
        </select>

        <label for="title">Título: </label>
        <input
          id="title"
          type="text"
          formControlName="title"
          placeholder="Título del artículo"
        />

        <label for="body">Contenido: </label>
        <textarea
          id="body"
          formControlName="body"
          placeholder="Escribe aquí..."
        ></textarea>
      </form>
    </div>
  `,
  styleUrls: ['./trend-compose.component.scss'],
})
export class TrendComposeComponent implements OnInit, OnDestroy {
  public trendForm = new FormGroup({
    url: new FormControl(),
    provider: new FormControl(),
    title: new FormControl(),
    body: new FormControl(),
    image: new FormControl()
  });

  public isEdit = true;
  public providers = PROVIDERS;

  protected trend$ = this.store.select(selectSelectedTrend);
  private trend: Trend | undefined;
  private subscription: Subscription | undefined;

  @Output() close = new EventEmitter<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.trend$.subscribe((trend) => {
      console.log(trend);
      if (trend) {
        this.trend = trend;
        this.patchForm(trend);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  patchForm(trend: Trend) {
    this.trendForm.patchValue({
      url: trend.url,
      provider: trend.provider,
      title: trend.title,
      body: trend.body,
      image: trend.image
    });
  }

  closeModal() {
    this.close.emit();
  }

  saveTrend() {
    if (this.isEdit) {
      const changedValues = this.getChangedValues(this.trendForm);
      console.log(changedValues)
      this.store.dispatch(
        updateTrend({
          changes: changedValues,
          trend: this.trend!,
        })
      );
      this.closeModal();
    }
  }

  getChangedValues(formGroup: FormGroup): any {
    const changedValues: any = {};
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        if(key == 'body') {
          changedValues[key] = control.value.replace(/(?:\r\n|\r|\n)/g, '\n');
        } else {
          changedValues[key] = control.value;
        }
      }
    });
    return changedValues;
  }
}
