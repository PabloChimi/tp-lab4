import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule , RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imageSrc: string = 'https://firebasestorage.googleapis.com/v0/b/lab4-tp1.appspot.com/o/pixelfaviconpng.png?alt=media&token=da29d1be-b545-4dcd-a716-4138157433c4';
  
  isLoggedIn: boolean = false;
  userLogged: string | undefined;
  constructor(private router: Router, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      console.log("loged in: " +  loggedIn);
      this.isLoggedIn = loggedIn;
    });    
  }

  goTo(path: String) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
  }
}
