import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Encuesta } from '../../interface/encuesta';
import { AuthenticationService } from '../../services/authentication.service';
import { EncuestaService } from '../../services/encuesta.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {
  encuestaForm: FormGroup;
  encuesta!:Encuesta;
  user:any;
  constructor(private fb: FormBuilder, private ruteo: Router, private auth: AuthenticationService, private encuestaService: EncuestaService) { 
      this.user = auth.getUserLoggedName();

      this.encuestaForm = fb.group({
        nombre:['',[Validators.required,Validators.minLength(2),Validators.pattern('^[A-Za-z]*')]],
        apellido:['',[Validators.required,Validators.minLength(2),Validators.pattern('^[A-Za-z]*')]],
        edad:['',[Validators.required,Validators.min(18)]],
        telefono:['',[Validators.required,Validators.pattern('^[0-9]*'),Validators.maxLength(10)]],
        puntuacion:['',[Validators.required]],
        juegoFavorito:['',[Validators.required]],
        texto: ['',[Validators.required, Validators.minLength(5)]]
      })
    }

  ngOnInit(): void {
  }

  enviarEncuesta(){
    this.encuesta = {
      ...this.encuestaForm.value,
    }

    console.log(this.encuesta)
    this.encuestaService.enviarEncuesta(this.encuesta);

    Swal.fire({
      title: '¡Encuesta enviada!',
      text: `La encuesta de ${this.user} se ha envidao correctamente correctamente: `,
      background: '#E0E0E0',
      color: '#000000',
      heightAuto: false,
      cancelButtonColor: '#6D4F92',
      showCancelButton: true,
      cancelButtonText: 'Salir'
    }).then(() => {
      this.ruteo.navigate(['/'])
    });
  }
  
  salir() {
    this.ruteo.navigate(['/'])
  }
}
