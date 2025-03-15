import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model
} from '@angular/core';

@Component({
  selector: 'app-canvas',
  styles: `
    :host {
      overflow: auto;

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
    }
  `,
  template: `
    <div class="canvas">
      <ng-content />
    </div>
  `,
})
export class CanvasComponent {
  private readonly canvasContainer = inject(ElementRef);

    scale = model<number>(1);
    scaleMax = input<number>(2);
    scaleMin = input<number>(0);

    limitedScale = computed(() => {
      const s = this.scale();
      const max = this.scaleMax();
      const min = this.scaleMin();
      return Math.max(min, Math.min(max, s));
    });

  ngAfterViewInit() {
    const container = this.canvasContainer.nativeElement;
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
  }
}
