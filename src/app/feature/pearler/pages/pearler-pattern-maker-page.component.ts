import { KeyValuePipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { CanvasComponent } from '../../../shared/components/canvas.component';
import { BasicPearlerTrayComponent } from '../components/basic-pearler-tray.component';
import { PearlerInitializationDialogComponent } from '../components/pearler-initialization-dialog.component';
import { PearlerDesignerToolbarComponent } from '../components/toolbar.component';
import { AvailableGridPipe } from '../pipes/available-grid.pipe';
import { GridColumnPipe, GridRowPipe, RepeatPipe } from '../pipes/grid-layout.pipe';
import { Direction, PearlerGridManagerService } from '../services/pearler-grid-manager.service';

@Component({
  selector: 'pearler-pattern-maker-page',
  imports: [
    PearlerDesignerToolbarComponent,
    BasicPearlerTrayComponent,
    CanvasComponent,
    KeyValuePipe,
    PearlerInitializationDialogComponent,
    AvailableGridPipe,
    GridRowPipe,
    GridColumnPipe,
    RepeatPipe,
  ],
  providers: [PearlerGridManagerService],
  styles: `
    :host {
        display: flex;
        height: 100%;
        overflow: hidden;
    }

    .pearler-tray-grid {
      display: grid;
    }

    app-canvas {
      flex-grow: 1;
    }
  `,
  template: `
    @let pearlerGrids = this.pearlerGrids();
    <pearler-designer-toolbar
      [(color)]="color"
      (clear)="onClearGrids()"
      (reset)="onResetGrids()"
      (colorPicker)="onColorPickerClick()"
    />

    <app-canvas>
      <div class="pearler-tray-grid"
        [style.gridTemplateColumns]="trayGridDimensions().width | repeat"
        [style.gridTemplateRows]="trayGridDimensions().height | repeat"
      >
        @for(grid of pearlerGrids | keyvalue; track grid.key) {
        <basic-pearler-tray
          [cursor]="colorPickerActive() ? 'colorPicker' : 'pointer'"

          [style.gridRow]="grid.key | gridRow : trayGridOffset().y + 1"
          [style.gridColumn]="grid.key | gridColumn : trayGridOffset().x + 1"

          [rgbGrid]="grid.value"
          [pearlerSize]="12"
          [availableUp]="grid.key | isAvailable : pearlerGrids : 'up'"
          [availableDown]="grid.key | isAvailable : pearlerGrids : 'down'"
          [availableLeft]="grid.key | isAvailable : pearlerGrids : 'left'"
          [availableRight]="grid.key | isAvailable : pearlerGrids : 'right'"
          (pearlerClick)="onPearlerClick(grid.key, $event[0], $event[1], $event[2])"
          (addTrayClick)="onAddGrid(grid.key, $event)"
        />
        }
      </div>
    </app-canvas>

    <pearler-initialization-dialog
      [(visible)]="showPearlerInitializationDialog"
      (initialize)="onInitializeGrid($event)"
    />
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
  trayGridDimensions = this.pearlerGridManagerSvc.getTrayGridDimensions();
  trayGridOffset = this.pearlerGridManagerSvc.getTrayGridOffset();

  colorPickerActive = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      if (this.pearlerGrids().size != 0) return;
      this.showPearlerInitializationDialog.set(true);
    });
  }

  onPearlerClick(gridPositionKey: string, row: number, column: number, color: number[]) {
    if(this.colorPickerActive()) {
      this.color.set({ r: color[0], g: color[1], b: color[2] });
      this.colorPickerActive.set(false);
    } else {
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

  onAddGrid(key: string, direction: Direction) {
    const [x, y] = key.split(':').map(Number);

    if(direction == 'up') {
      this.pearlerGridManagerSvc.addGrid(x, y - 1);
    }
    else if(direction == 'down') {
      this.pearlerGridManagerSvc.addGrid(x, y + 1);
    }
    else if(direction == 'left') {
      this.pearlerGridManagerSvc.addGrid(x - 1, y);
    }
    else {
      this.pearlerGridManagerSvc.addGrid(x + 1, y);
    }
  }

  onColorPickerClick() {
    this.colorPickerActive.set(true);
  }
}
