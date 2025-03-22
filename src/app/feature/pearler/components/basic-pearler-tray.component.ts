import { Component, computed, effect, HostBinding, inject, input, output } from '@angular/core';
import { PearlerGridManagerService } from '../services/pearler-grid-manager.service';
import { BackgroundColorPipe } from '../pipes/background-color.pipe';

@Component({
    selector: 'basic-pearler-tray',
    imports: [BackgroundColorPipe],
    styles: `
        :host {
            display:  grid;
            border: 1px solid black;
        }

        .pearler {
            border: 1px solid black;
            border-radius: 100%;
            display: block;
            box-sizing: border-box;
            cursor: pointer;
        }
    `,
    template: `
        @for(row of rgbGrid(); let r = $index; track r) {
            @for(col of row; let c = $index; track c) {
                <div
                    class="pearler"
                    [style.backgroundColor]="col | bgColor"
                    [style.width.px]="pearlerSize()"
                    [style.height.px]="pearlerSize()"
                    (click)="onPearlerClick(r, c)"
                ></div>
            }
        }
    `
})

export class BasicPearlerTrayComponent {

    @HostBinding('style.width.px') get _trayWidth() {
        return this.trayWidth();
    }

    @HostBinding('style.height.px') get _trayHeight() {
        return this.trayHeight();
    }

    @HostBinding('style.grid-tempalte-rows') get gridTemplateRows() {
        return `repeat(${this.height()}, ${this.pearlerSize()}px)`;
    }

    @HostBinding('style.grid-template-columns') get gridTemplateColumns() {
        return `repeat(${this.width()}, ${this.pearlerSize()}px)`;
    }

    width = input.required<number>();
    height = input.required<number>();
    pearlerSize = input<number>(8);
    rgbGrid = input.required<number[][][]>();
    pearlerClick = output<[number, number]>();

    trayWidth = computed(() => this.pearlerSize()*this.width());
    trayHeight = computed(() => this.pearlerSize()*this.height());

    onPearlerClick(row: number, column: number) {
        this.pearlerClick.emit([row, column]);
    }
}