import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pearler-designer-toolbar',
    styles: `
        :host { 
            display: block;
            height: 100%;
            flex: 0 0 150px;
            border: 1px solid rgba(0,0,0,0.2);
        }
    `,
    template: `
        <p>Test</p>
    `
})

export class PearlerDesignerToolbarComponent {
}