import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0;
      height: 100vh;
      overflow: none;
    }
  `,
  template: `
    <p-menubar [model]="menuItems">
      <ng-template #start>
          <h1>Kandi Designer</h1>
      </ng-template>
    </p-menubar>
    <router-outlet/>
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  
  title = 'Kandi Designer';
  menuItems: MenuItem[] = [
    {
      label: 'Pearler Designer',
      command: () => this.router.navigate(['/pearler/designer'])
    },
    {
      label: 'Multi-stitch Designer',
      command: () => this.router.navigate(['/multi-stitch/designer'])
    }
  ]
}
