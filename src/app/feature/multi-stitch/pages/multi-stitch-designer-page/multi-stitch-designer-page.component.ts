import { Component, computed, inject } from '@angular/core';
import { CanvasComponent } from '../../../../shared/components/canvas.component';
import { MultiStitchGridManagerService } from './services/multi-stitch-grid-manager.service';
import { MultiStitchRowNumberPipe } from './pipes/multi-stitch-row-number.pipe';

@Component({
  selector: 'multi-stitch-designer-page',
  imports: [CanvasComponent, MultiStitchRowNumberPipe],
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
      display: flex;
      flex-direction: column-reverse;
    }

    .multistitch-column.even {
      margin-bottom: 10px;
    }

    .bead {
        border: .5px solid black;
        display: grid;
        place-content: center;
        box-sizing: border-box;
        cursor: pointer;
        width: 17px;
        height: 20px;

        font-size: 8px;
        text-align: center;
    }

    
    `,
  template: `
    <app-canvas>
        <div class="multi-stitch-wrapper" >

          @for (col of multiStitchGrid(); let c = $index; track c){
            <div 
              class="multistitch-column"
              [class.even]="c % 2 == 0"
            >
          
            @for(row of col; let r = $index; track r) {
              <div class="bead">
                {{ r | rowNumber:c}}
              </div>
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
