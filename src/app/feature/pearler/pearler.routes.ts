import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'maker',
        loadComponent: () => import('./pages/pearler-pattern-maker-page.component').then(m => m.PearlerPatternMakerPageComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'maker'
    }
]