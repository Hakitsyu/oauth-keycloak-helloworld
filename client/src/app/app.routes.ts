import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'user',
        loadComponent: () => import('./pages/user.component').then(m => m.UserComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: '**',
        loadComponent: () => import('./pages/default.component').then(m => m.DefaultComponent)
    }
];
