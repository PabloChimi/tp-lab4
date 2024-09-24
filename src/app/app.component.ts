import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./component/home/home.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./component/navbar/navbar.component";
import { ChatComponent } from "./component/chat/chat.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLinkActive, RouterLink, CommonModule, NavbarComponent, ChatComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-lab4';
  isChatOpen: boolean = false;  // Estado para controlar si el chat está abierto o cerrado
  faComment = faComment;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });    

    

  }

  toggleChat() {
    console.log("Abro chat")
    this.isChatOpen = !this.isChatOpen;  // Alterna entre abierto/cerrado
  }

}
