import { Routes } from '@angular/router';
import { routes as PearlerRoutes } from './feature/pearler/pearler.routes';

export const routes: Routes = [
    {
        path: 'pearler',
        loadChildren: () => PearlerRoutes
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'pearler'
    }
];
