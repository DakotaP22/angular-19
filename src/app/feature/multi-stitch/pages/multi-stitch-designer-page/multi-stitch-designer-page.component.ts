import { Component, computed, inject, OnInit } from '@angular/core';
import { MultiStitchGridManagerService } from './services/multi-stitch-grid-manager.service';
import { CanvasComponent } from '../../../../shared/components/canvas.component';
import { CssRepeatPipe } from '../../../../shared/pipe/css-repeat.pipe';

@Component({
  selector: 'multi-stitch-designer-page',
  imports: [CanvasComponent, CssRepeatPipe],
  providers: [MultiStitchGridManagerService],
  styles: `
    :host {
        display: flex;
        height: 100%;
        overflow: hidden;
    }

    .multi-stitch-wrapper {
        display: flex;
    }

    .multistitch-column {
      // border: 1px solid red;
    }

    .multistitch-column.odd {
      margin-top: 10px;
    }

    .bead {
        border: .5px solid black;
        display: block;
        box-sizing: border-box;
        cursor: pointer;
        width: 17px;
        height: 20px;
    }

    
    `,
  template: `
    <app-canvas>
        <div class="multi-stitch-wrapper" >

          @for (row of multiStitchGrid(); let r = $index; track r){
            <div 
              class="multistitch-column"
              [class.odd]="r % 2 != 0"
            >
          
            @for(col of row; let c = $index; track c) {
              <div class="bead"></div>
            }
          
            </div>

          }

        </div>
      </app-canvas>
  `,
})
export class MultiStitchDesignerPageComponent {
  private readonly gridManager = inject(MultiStitchGridManagerService);
  readonly multiStitchGrid = this.gridManager.getMutliStitchGrid();

  height = computed(() => this.multiStitchGrid()?.length ?? 0);
  width = computed(() => this.multiStitchGrid()?.[0].length ?? 0);

  constructor() {
    this.gridManager.initializeFreshGrid(10, 20);
  }
}
