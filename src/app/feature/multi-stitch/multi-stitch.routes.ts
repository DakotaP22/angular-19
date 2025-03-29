import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'designer',
    loadComponent: () =>
      import('./pages/multi-stitch-designer-page.component').then(
        (m) => m.MultiStitchDesignerPageComponent
      ),
  },
];
