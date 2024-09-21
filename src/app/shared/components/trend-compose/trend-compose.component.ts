import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Trend } from '../../../trends/models/trend.model';
import { Store } from '@ngrx/store';
import {
  createTrend,
  updateTrend,
} from '../../../trends/store/actions/trends-compose-page.actions';
import { Subscription } from 'rxjs';
import { selectSelectedTrend } from '../../../trends/store/selectors';
import { PROVIDERS } from '../../constants/providers';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-trend-compose',
  template: `
    <ng-container *ngIf="visible">
      <div class="modal__backdrop" (click)="closeModal()"></div>
      <div @modalAnimation class="modal__content">
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

        <label *ngIf="formHasErrors" class="error-label">Favor de llenar todos los campos</label>

        <form class="modal__body" [formGroup]="trendForm">
          <label for="url" [ngClass]="{ 'error-label': checkInputValidity('url')}">URL de la noticia: </label>
          <input id="url" type="text" formControlName="url" />

          <label for="image" [ngClass]="{ 'error-label': checkInputValidity('image')}">URL de la Imagen: </label>
          <input id="image" type="text" formControlName="image" />

          <label for="provider" [ngClass]="{ 'error-label': checkInputValidity('provider')}">Proveedor: </label>
          <select id="provider" formControlName="provider">
            <option *ngFor="let provider of providers" [value]="provider.value">
              {{ provider.name }}
            </option>
          </select>

          <label for="title" [ngClass]="{ 'error-label': checkInputValidity('title')}">Título: </label>
          <input
            id="title"
            type="text"
            formControlName="title"
            placeholder="Título del artículo"
          />

          <label for="body" [ngClass]="{ 'error-label': checkInputValidity('body')}">Contenido: </label>
          <textarea
            id="body"
            formControlName="body"
            placeholder="Escribe aquí..."
          ></textarea>
        </form>
      </div>
    </ng-container>
  `,
  styleUrls: ['./trend-compose.component.scss'],
  animations: [
    trigger('modalAnimation', [
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
export class TrendComposeComponent implements OnInit, OnDestroy {
  public trendForm: FormGroup;
  public providers = PROVIDERS;
  public formHasErrors: boolean = false;

  protected trend$ = this.store.select(selectSelectedTrend);
  private trend: Trend | undefined;
  private subscription: Subscription | undefined;
  private _visible: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Input() isEdit = false;
  @Input() set visible(isVisible: boolean) {
    this._visible = isVisible;
    if (isVisible) {
      setTimeout(() => {
        document.querySelector('.modal__content')?.classList.add('show');
      }, 10);
    } else {
      document.querySelector('.modal__content')?.classList.remove('show');
    }
  }

  get visible() {
    return this._visible;
  }

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.trendForm = this.formBuilder.nonNullable.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      body: ['', Validators.required],
      provider: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.subscription = this.trend$.subscribe((trend) => {
        if (trend) {
          this.trend = trend;
          this.patchForm(trend);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  checkInputValidity (controlName: string) {
    return this.trendForm.get(controlName)?.invalid && this.trendForm.get(controlName)?.touched && this.formHasErrors;
  }

  closeModal() {
    if(!this.isEdit) {
      this.trendForm.reset();
    }
    this.formHasErrors = false;
    this.close.emit();
  }

  saveTrend() {
    if (this.trendForm.valid) {
      if (this.isEdit && this.trend) {
        const changedValues = this.getChangedValues(this.trendForm);
        this.store.dispatch(
          updateTrend({
            changes: changedValues,
            trend: this.trend,
          })
        );
        this.closeModal();
      } else {
        this.store.dispatch(
          createTrend({
            newTrend: this.trendForm.getRawValue(),
          })
        );
        this.closeModal();
      }
    } else {
      this.trendForm.markAllAsTouched();
      this.formHasErrors = true;
    }
  }

  private patchForm(trend: Trend) {
    this.trendForm.patchValue({
      url: trend.url,
      provider: trend.provider,
      title: trend.title,
      body: trend.body,
      image: trend.image,
    });
  }

  private getChangedValues(formGroup: FormGroup): any {
    const changedValues: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        if (key == 'body') {
          changedValues[key] = control.value.replace(/(?:\r\n|\r|\n)/g, '\n');
        } else {
          changedValues[key] = control.value;
        }
      }
    });
    return changedValues;
  }
}
