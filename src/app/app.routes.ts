import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AhorcadoComponent } from './component/juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './component/juegos/mayormenor/mayormenor.component';
import { LaberintoComponent } from './component/juegos/laberinto/laberinto.component';
import { PreguntadosComponent } from './component/juegos/preguntados/preguntados.component';

export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '', pathMatch: "full" },
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'mayoromenor', component: MayormenorComponent },
    { path: 'laberinto', component: LaberintoComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    // La ruta comodin debe ir siempre al final
    { path: '**', component: PageNotFoundComponent },
    
];
