import { Routes } from '@angular/router';
import { routes as PearlerRoutes } from './feature/pearler/pearler.routes';
import { routes as MultiStitchRoutes } from './feature/multi-stitch/multi-stitch.routes';

export const routes: Routes = [
    {
        path: 'pearler',
        loadChildren: () => PearlerRoutes
    },
    {
        path: 'multi-stitch',
        loadChildren: () => MultiStitchRoutes
    },  
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'pearler'
    }
];
