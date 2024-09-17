import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  emailIngresado!: string;
  passwordIngresado!: string;

  constructor(private  authService:  AuthenticationService) {}

  registrar() {
    this.authService.register(this.emailIngresado, this.passwordIngresado);
  }
}
