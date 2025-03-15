import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { BasicPearlerTrayComponent } from '../components/basic-pearler-tray.component';
import { PearlerDesignerToolbarComponent } from '../components/toolbar.component';

@Component({
  selector: 'pearler-pattern-maker-page',
  imports: [PearlerDesignerToolbarComponent, BasicPearlerTrayComponent],
  styles: `
        :host {
            display: flex;
            height: 100%;
            overflow: hidden;
        }

        .canvas-container {
            overflow: auto;
            flex-grow: 1;
            border: 5px solid black;

            /* Hide scrollbar for WebKit browsers */
            ::-webkit-scrollbar {
                display: none;
            }
            /* Hide scrollbar for IE, Edge */
            scrollbar-width: none; /* Hide scrollbar for Firefox */
        }

        .canvas {
            display: grid;
            place-content: center;
            width: 10000px;
            height: 10000px;
        }
    `,
  template: `
    <pearler-designer-toolbar 
      [(pearlerSize)]="pearlerSize"
      [(width)]="width"
      [(height)]="height"
    />

    <div class="canvas-container" #canvasContainer>
      <div class="canvas">
        <basic-pearler-tray
          [width]="width()"
          [height]="height()"
          [pearlerSize]="pearlerSize()"
          [rgb]="[0, 0, 0]"
        />
      </div>
    </div>
  `,
})
export class PearlerPatternMakerPageComponent {
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  pearlerSize = signal<number>(12);
  width = signal<number>(32);
  height = signal<number>(32);

  ngAfterViewInit() {
    const container = this.canvasContainer.nativeElement;
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
  }
}
