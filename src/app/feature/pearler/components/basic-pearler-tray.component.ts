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

        .pearler.colorPickerActive {
            cursor: url(data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8BAAAAfwAAAIH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAAAcQAAAN8AAADTAAAArwAAAE8AAAAJ////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAJEAAADLAAAAEwAAAHsAAADDAAAA3wAAADP///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAAAuQAAAHX///8B////AQAAAF0AAADtAAAAOf///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAFMAAAC/////Af///wH///8BAAAAUQAAAO0AAAA5////Af///wH///8B////Af///wH///8B////Af///wEAAAANAAAA5wAAAFH///8B////Af///wEAAABRAAAA7QAAADn///8B////Af///wH///8B////Af///wH///8B////AQAAAD0AAADtAAAARf///wH///8B////AQAAAFEAAADtAAAAOQAAACP///8B////Af///wH///8B////Af///wH///8BAAAARQAAAO0AAABF////Af///wH///8BAAAAUQAAAO0AAADvAAAAmf///wH///8B////Af///wH///8B////Af///wEAAABFAAAA7QAAAEX///8B////AQAAADUAAADxAAAA/wAAAPcAAAAr////Af///wH///8B////Af///wH///8B////AQAAAEUAAADtAAAARQAAADUAAADvAAAA/wAAAPcAAABFAAAALf///wH///8B////Af///wH///8B////Af///wH///8BAAAARQAAAO0AAADvAAAA/wAAAPcAAABFAAAAgwAAAPsAAABX////Af///wH///8B////Af///wH///8B////AQAAACUAAADvAAAA/wAAAPcAAABFAAAAgwAAAP8AAAD/AAAA+wAAAE////8B////Af///wH///8B////Af///wEAAAADAAAAoQAAAPcAAABFAAAAgwAAAP8AAAD/AAAA/wAAAP8AAADf////Af///wH///8B////Af///wH///8B////AQAAAAMAAAAvAAAALQAAAPsAAAD/AAAA/wAAAP8AAAD/AAAA+////wH///8B////Af///wH///8B////Af///wH///8B////Af///wEAAABXAAAA+wAAAP8AAAD/AAAA/wAAALX///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAE8AAADfAAAA+wAAALUAAAAXAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==), default;
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
            transform: translate(-60%, 0%) rotate(-90deg);
            top: 50%; 
            left: 0; 
        }
        .add-tray-btn.right { 
            transform: translate(60%, 0%) rotate(90deg);
            top: 50%;
            right: 0;
        }
    `,
    template: `
        @let cursor = this.cursor();
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
                    [class.colorPickerActive]="cursor == 'colorPicker'"
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
    cursor = input<'pointer' | 'colorPicker'>('pointer');

    width = computed(() => this.rgbGrid()[0].length);
    height = computed(() => this.rgbGrid().length);

    pearlerClick = output<[number, number, number[]]>();
    addTrayClick = output<Direction>();

    trayWidth = computed(() => this.pearlerSize()*this.width());
    trayHeight = computed(() => this.pearlerSize()*this.height());

    onPearlerClick(row: number, column: number) {
        if(this.cursor() === 'colorPicker') {
            const rgb = this.rgbGrid()[row][column];
            this.pearlerClick.emit([row, column, rgb]);
        } else if(this.cursor() == 'pointer') {
            this.pearlerClick.emit([row, column, []]);
        }
    }
}