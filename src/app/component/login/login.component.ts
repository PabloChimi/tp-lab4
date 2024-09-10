import { Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    /*private firestore = inject(AngularFirestore);

    guardar() {
      const col = this.firestore.collection('usuarios');
      col.add({ User: '', Password: '' });
    }*/
}
