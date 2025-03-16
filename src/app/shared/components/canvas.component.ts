import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-canvas',
  imports: [SliderModule, FormsModule],
  styles: `

    :host {
      overflow: hidden;
      position: relative;
      display: flex;
    }

    .canvas-container {
      overflow: auto;
      border: 5px solid black;

      ::-webkit-scrollbar {
        display: none;
      }
      scrollbar-width: none; /* Hide scrollbar for Firefox */
    }

    .canvas {
      display: grid;
      place-content: center;
      width: 10000px;
      height: 10000px;
      position: relative;
      transform-origin: center center;
    }

    .slider-container {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 1000;

      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin: 0 0 4px 0;
      }
    }

  `,
  template: `
    <div class="slider-container">
      <p>{{ scale() }}%</p>
      <p-slider 
        orientation="vertical" 
        step="10" 
        min="10"
        max="200"
        [(ngModel)]="scale"
      ></p-slider>
    </div>

    <div #canvasContainer class="canvas-container">
      <div class="canvas" [style.transform]="'scale(' + scale() / 100 + ')'">
        <ng-content />
      </div>
    </div>
  `,
})
export class CanvasComponent {
  @ViewChild('canvasContainer') canvasContainer!: ElementRef<HTMLDivElement>;

  scale = signal<number>(100);

  ngAfterViewInit() {
    const container = this.canvasContainer.nativeElement;
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
  }
}
