import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerComponent } from './color-picker.component';

@Component({
  selector: 'pearler-designer-toolbar',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ColorPickerComponent,
  ],
  styles: `
        :host { 
            display: flex;
            flex-direction: column;
            height: 100%;
            flex: 0 0 150px;
            border: 1px solid rgba(0,0,0,0.2);
            gap: 1rem;
        }

        .dimension-form {
            display: flex;
            flex-wrap: nowrap;
            gap: .5rem;
            align-items: flex-end;
            padding: 0 .5rem;

            input {
              width: 75px;
            }
        }
    `,
  template: `
    <color-picker [(color)]="color" />
  `,
})
export class PearlerDesignerToolbarComponent {
  color = model.required<{ r: number; g: number; b: number }>();
}
