import { Component, computed, linkedSignal, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { BackgroundColorPipe } from '../../../shared/pipe/background-color.pipe';

export type RGB_Options = {
    r: number;
    g: number;
    b: number;
}

@Component({
  selector: 'color-picker',
  imports: [ColorPickerModule, FormsModule, BackgroundColorPipe],
  styles: `
        .color-picker {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;

            label {
                display: block;
                padding-left: .5rem;
                grid-column: 1 / 3;
            }

            input {
                width: 75px;
            }
        }

        .rgb-form {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding-right: .5rem;
            padding-left: 1rem;
            

            label {
                padding-left: 0;
            }

            .color-preview {
                display: block;
                width: 75px;
                height: 22px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                margin-top: 4px;
            }
        }
    `,
  template: `
    <div class="color-picker">
      <label for="color">Tray Color</label>
      <p-colorpicker id="label" [inline]="true" format="rgb" [(ngModel)]="color" />

      <form class="rgb-form">
        <span class="form-input-group">
          <label for="red">Red</label>
          <input id="red" type="number" min="0" [(ngModel)]="red" name="r" />
        </span>
        <span class="form-input-group">
          <label for="green">Green</label>
          <input id="green" type="number" min="0" [(ngModel)]="green" name="g" />
        </span>
        <span class="form-input-group">
          <label for="blue">Blue</label>
          <input id="blue" type="number" min="0" [(ngModel)]="blue" name="b" />
        </span>

        <span 
            class="color-preview"
            [style.backgroundColor]="colorArray() | bgColor"
        ></span>
      </form>
    </div>
  `,
})
export class ColorPickerComponent {
    color = model.required<RGB_Options>();
    colorArray = computed(() => {
        const color = this.color();
        return [color.r, color.g, color.b];
    })

    get red() {
        return this.color().r;
    }

    set red(value: number) {
        this.color.set({ ...this.color(), r: value });
    }

    get green() {
        return this.color().g;
    }

    set green(value: number) {
        this.color.set({ ...this.color(), g: value });
    }

    get blue() {
        return this.color().b;
    }

    set blue(value: number) {
        this.color.set({ ...this.color(), b: value });
    }
}
