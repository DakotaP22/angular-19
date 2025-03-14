import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'designer',
        loadComponent: () => import('./pages/pearler-pattern-maker-page.component').then(m => m.PearlerPatternMakerPageComponent)
    },
]