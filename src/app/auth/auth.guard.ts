import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log(this.authService.isLogged)
    console.log(route)
    console.log(state)
    if (this.authService.isLogged && (state.url == "/resultadosEncuesta" && this.authService.isAdmin)) {
      return true; // Si el usuario está logueado, permite el acceso
    }
    if (this.authService.isLogged && !(state.url == "/resultadosEncuesta")) {
      return true; // Si el usuario está logueado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login si no está logueado
      return false; // Bloquea el acceso
    }
  }

  canAdminActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log(this.authService.isLogged)
    console.log(route)
    console.log(state)
    if (this.authService.isLogged && this.authService.isAdmin) {
      return true; // Si el usuario está logueado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login si no está logueado
      return false; // Bloquea el acceso
    }
  }
}
