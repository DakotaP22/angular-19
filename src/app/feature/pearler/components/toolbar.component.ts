import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'pearler-designer-toolbar',
  imports: [ButtonModule, FormsModule, InputTextModule, FloatLabelModule],
  styles: `
        :host { 
            display: flex;
            flex-direction: column;
            height: 100%;
            flex: 0 0 350px;
            border: 1px solid rgba(0,0,0,0.2);
        }

        .dimension-form {
            display: flex;
            flex-wrap: nowrap;
            gap: .5rem;
            align-items: flex-end;
        }
    `,
  template: `
    <p-button class="red-button" label="Zoom In" (click)="zoomIn()" />
    <p-button label="Zoom Out" (click)="zoomOut()" />

    <hr />

    <form class="dimension-form">
      <span class="form-input-group">
        <label for="width">Tray Width</label>
        <input id="width" type="number" [(ngModel)]="width" name="width" min="1" />
      </span>
      X
      <span class="form-input-group">
        <label for="height">Tray Height</label>
        <input id="height" type="number" [(ngModel)]="height" name="height" min="1" />
      </span>
    </form>
  `,
})
export class PearlerDesignerToolbarComponent {
  pearlerSize = model.required<number>();
  width = model.required<number>();
  height = model.required<number>();

  zoomIn() {
    this.pearlerSize.set(this.pearlerSize() + 1);
  }

  zoomOut() {
    this.pearlerSize.set(this.pearlerSize() - 1);
  }
}
