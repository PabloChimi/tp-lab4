import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { authInstance$ } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, FormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailIngresado!: string;
  passwordIngresado!: string;

    /*private firestore = inject(AngularFirestore);
    guardar() {
      const col = this.firestore.collection('usuarios');
      col.add({ User: '', Password: '' });
    }*/

      constructor(private  authService:  AuthenticationService) {}
      
      login() {
        this.authService.login(this.emailIngresado, this.passwordIngresado);
      }

      fillCredentials(user: string, pass: string) {
        this.emailIngresado = user;
        this.passwordIngresado = pass;
      }
      
}
