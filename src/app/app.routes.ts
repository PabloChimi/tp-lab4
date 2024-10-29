import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '', pathMatch: "full" },
    {
        path: '',
        loadComponent: () => import('./component/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./component/about/about.component').then(c => c.AboutComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./component/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./component/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'ahorcado',
        loadComponent: () => import('./component/juegos/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'mayoromenor',
        loadComponent: () => import('./component/juegos/mayormenor/mayormenor.component').then(c => c.MayormenorComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'laberinto',
        loadComponent: () => import('./component/juegos/laberinto/laberinto.component').then(c => c.LaberintoComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'preguntados',
        loadComponent: () => import('./component/juegos/preguntados/preguntados.component').then(c => c.PreguntadosComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'resultadosJuegos',
        loadComponent: () => import('./component/resultados/resultados.component').then(c => c.ResultadosComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'encuesta',
        loadComponent: () => import('./component/encuesta/encuesta.component').then(c => c.EncuestaComponent)
    },
    {
        path: 'resultadosEncuesta',
        loadComponent: () => import('./component/resultado-encuesta/resultado-encuesta.component').then(c => c.ResultadoEncuestaComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        loadComponent: () => import('./component/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
    }
];
