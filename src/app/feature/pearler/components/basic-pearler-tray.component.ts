import { Component, computed, effect, HostBinding, inject, input, output } from '@angular/core';
import { Direction, PearlerGridManagerService } from '../services/pearler-grid-manager.service';
import { BackgroundColorPipe } from '../pipes/background-color.pipe';

@Component({
    selector: 'basic-pearler-tray',
    imports: [BackgroundColorPipe],
    styles: `
        :host {
            display:  grid;
            border: 1px solid black;
            position: relative;
        }

        .pearler {
            border: 1px solid black;
            border-radius: 100%;
            display: block;
            box-sizing: border-box;
            cursor: pointer;
        }

        .add-tray-btn { 
            position: absolute; 
            width: 100%; 
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: .75rem;
            color: rgba(0,0,0,.25);
        }
        .add-tray-btn:hover {
            color: rgba(0,0,0,.5);
        }
        .add-tray-btn.up { transform: translate(-50%, -125%); top: 0; left: 50%; }
        .add-tray-btn.down { transform: translate(-50%, 125%); bottom: 0; left: 50%; }
        .add-tray-btn.left { 
            transform: translate(-54%, 0%) rotate(-90deg);
            top: 50%; 
            left: 0; 
        }
        .add-tray-btn.right { 
            transform: translate(54%, 0%) rotate(90deg);
            top: 50%;
            right: 0;
        }
    `,
    template: `
        @if(availableUp()) {
            <button class="add-tray-btn up" (click)="addTrayClick.emit('up')">Add&nbsp;Tray</button>
        }
        @if(availableDown()) {
            <button class="add-tray-btn down" (click)="addTrayClick.emit('down')">Add&nbsp;Tray</button>
        }
        @if(availableLeft()) {
            <button class="add-tray-btn left" (click)="addTrayClick.emit('left')">Add&nbsp;Tray</button>
        }
        @if(availableRight()) {
            <button class="add-tray-btn right" (click)="addTrayClick.emit('right')">Add&nbsp;Tray</button>
        }

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

    
    pearlerSize = input<number>(8);
    rgbGrid = input.required<number[][][]>();
    availableUp = input.required<boolean>();
    availableDown = input.required<boolean>();
    availableLeft = input.required<boolean>();
    availableRight = input.required<boolean>();

    width = computed(() => this.rgbGrid()[0].length);
    height = computed(() => this.rgbGrid().length);

    pearlerClick = output<[number, number]>();
    addTrayClick = output<Direction>();

    trayWidth = computed(() => this.pearlerSize()*this.width());
    trayHeight = computed(() => this.pearlerSize()*this.height());

    onPearlerClick(row: number, column: number) {
        this.pearlerClick.emit([row, column]);
    }
}