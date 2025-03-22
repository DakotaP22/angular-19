import { Component, model, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'pearler-initialization-dialog',
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule],
  styles: `
    p-dialog::ng-deep .p-dialog-header {
        padding: .5rem 1.5rem;
    }
    .subtitle { 
        margin: .5rem 0 1rem 0;
    }

    .dimension-form {
        display: flex;
        align-items: flex-end;
        gap: 1rem;
    }

    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
    }
  `,
  template: `
    <p-dialog
      header="Pearler Dimensions"
      [modal]="true"
      closable="false"
      [(visible)]="visible"
    >
      <p class="subtitle">Set the dimensions of your pearler tray here.</p>

      <form class="dimension-form">
        <div class="form-input-group">
          <label for="width">Width</label>
          <input
            pInputText
            id="width"
            autocomplete="off"
            [(ngModel)]="width"
            name="width"
            type="number"
          />
        </div>
        <div class="form-input-group">
          <label for="height">Height</label>
          <input
            pInputText
            id="height"
            autocomplete="off"
            [(ngModel)]="height"
            name="height"
            type="number"
          />
        </div>
      </form>

      <div class="dialog-footer">
        <button pButton (click)="onInitializeClick()">OK</button>
      </div>
    </p-dialog>
  `,
})
export class PearlerInitializationDialogComponent {
  visible = model.required<boolean>();
  initialize = output<{ width: number; height: number }>();

  width = signal<number>(32);
  height = signal<number>(32);

  onInitializeClick() {
    this.initialize.emit({ width: this.width(), height: this.height() });
    this.visible.set(false);
  }
}
