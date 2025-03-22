import { Component, computed, effect, inject, signal } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { CanvasComponent } from '../../../shared/components/canvas.component';
import { BasicPearlerTrayComponent } from '../components/basic-pearler-tray.component';
import { PearlerDesignerToolbarComponent } from '../components/toolbar.component';
import { PearlerGridManagerService } from '../services/pearler-grid-manager.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'pearler-pattern-maker-page',
  imports: [
    PearlerDesignerToolbarComponent,
    BasicPearlerTrayComponent,
    CanvasComponent,
    KeyValuePipe,
  ],
  providers: [PearlerGridManagerService],
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
      [(color)]="color"
    />

    <app-canvas>
      @for(grid of pearlerGrids() | keyvalue; track grid.key) {
      <basic-pearler-tray
        [width]="width()"
        [height]="height()"
        [rgbGrid]="grid.value"
        [pearlerSize]="12"
        (pearlerClick)="onPearlerClick(grid.key, $event[0], $event[1])"
      />
      }
    </app-canvas>
  `,
})
export class PearlerPatternMakerPageComponent {
  width = signal<number>(32);
  height = signal<number>(32);

  color = injectLocalStorage('pearler-designer-color', {
    storageSync: true,
    defaultValue: { r: 0, g: 0, b: 0 },
  });

  colorArray = computed<[number, number, number]>(() => {
    const color = this.color();
    return [color.r, color.g, color.b];
  });

  private readonly pearlerGridManagerSvc = inject(PearlerGridManagerService);
  pearlerGrids = this.pearlerGridManagerSvc.getPearlerGrids();

  onPearlerClick(gridPositionKey: string, row: number, column: number) {
    const { r, g, b } = this.color();
    this.pearlerGridManagerSvc.setPixelColor(
      gridPositionKey,
      row,
      column,
      r,
      g,
      b
    );
  }

  _ = effect(() => console.log(this.pearlerGrids()));

}
