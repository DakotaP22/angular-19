import { Component } from '@angular/core';
import { BasicPearlerTrayComponent } from '../components/basic-pearler-tray.component';

@Component({
    selector: 'pearler-pattern-maker-page',
    imports: [BasicPearlerTrayComponent],
    styles: `
        :host {
            display: flex;
        }
    `,
    template: `
        <basic-pearler-tray 
            [width]="28"
            [height]="30"
            [pearlerSize]="18"
            [rgb]="[0,0,0]"
        />
    `
    
})

export class PearlerPatternMakerPageComponent {
}