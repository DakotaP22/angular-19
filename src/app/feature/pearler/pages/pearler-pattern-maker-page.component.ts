import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { CanvasComponent } from '../../../shared/components/canvas.component';
import { BasicPearlerTrayComponent } from '../components/basic-pearler-tray.component';
import { PearlerDesignerToolbarComponent } from '../components/toolbar.component';
import { PearlerGridManagerService } from '../services/pearler-grid-manager.service';
import { KeyValuePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PearlerInitializationDialogComponent } from '../components/pearler-initialization-dialog.component';

@Component({
  selector: 'pearler-pattern-maker-page',
  imports: [
    PearlerDesignerToolbarComponent,
    BasicPearlerTrayComponent,
    CanvasComponent,
    KeyValuePipe,
    PearlerInitializationDialogComponent,
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
    }
  `,
  template: `
    <pearler-designer-toolbar 
      [(color)]="color" 
      (clear)="onClearGrids()"
      (reset)="onResetGrids()"/>

    <app-canvas>
      @for(grid of pearlerGrids() | keyvalue; track grid.key) {
      <basic-pearler-tray
        [rgbGrid]="grid.value"
        [pearlerSize]="12"
        (pearlerClick)="onPearlerClick(grid.key, $event[0], $event[1])"
      />
      }
    </app-canvas>

    <pearler-initialization-dialog 
      [(visible)]="showPearlerInitializationDialog"
      (initialize)="onInitializeGrid($event)"/>
  `,
})
export class PearlerPatternMakerPageComponent {
  showPearlerInitializationDialog = signal<boolean>(false);

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

  constructor() {
    afterNextRender(() => {
      if (this.pearlerGrids().size != 0) return;

      this.showPearlerInitializationDialog.set(true);
    });
  }

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

  onInitializeGrid({ width, height }: { width: number; height: number }) {
    this.pearlerGridManagerSvc.initializeFreshGrids(width, height);
  }

  onClearGrids() {
    this.pearlerGridManagerSvc.clearGrids();
  }

  onResetGrids() {
    this.showPearlerInitializationDialog.set(true);
  }
}
