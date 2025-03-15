import {
  Component,
  computed,
  signal
} from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { CanvasComponent } from '../../../shared/components/canvas.component';
import { BasicPearlerTrayComponent } from '../components/basic-pearler-tray.component';
import { PearlerDesignerToolbarComponent } from '../components/toolbar.component';

@Component({
  selector: 'pearler-pattern-maker-page',
  imports: [
    PearlerDesignerToolbarComponent,
    BasicPearlerTrayComponent,
    CanvasComponent,
  ],
  styles: `
    :host {
        display: flex;
        height: 100%;
        overflow: hidden;
    }

    app-canvas {
      flex-grow: 1;
      // border: 5px solid black;
    }
  `,
  template: `
    <pearler-designer-toolbar
      [(pearlerSize)]="pearlerSize"
      [(width)]="width"
      [(height)]="height"
      [(color)]="color"
    />

    <app-canvas>
      <basic-pearler-tray
        [width]="width()"
        [height]="height()"
        [pearlerSize]="pearlerSize()"
        [rgb]="colorArray()"
      />
    </app-canvas>
  `,
})
export class PearlerPatternMakerPageComponent {
  pearlerSize = signal<number>(12);
  width = signal<number>(32);
  height = signal<number>(32);

  // color = signal<{ r: number; g: number; b: number }>({ r: 0, g: 0, b: 0 });

  color = injectLocalStorage('pearler-designer-color', {
    storageSync: true,
    defaultValue: { r: 0, g: 0, b: 0 },
  });

  colorArray = computed<[number, number, number]>(() => {
    const color = this.color();
    return [color.r, color.g, color.b];
  });
}
