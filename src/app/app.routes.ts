import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Aca se definirán las rutas hijas que se mostrarán dentro del MainLayout
    ]
  },
  { path: '**', redirectTo: '' }
];
