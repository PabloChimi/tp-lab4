import { Component } from '@angular/core';
import { PaisesService } from '../../../services/paises.service';
import { Router, RouterLink } from '@angular/router';
import { Pais } from '../../../interface/pais';
import { Resultado } from '../../../interface/resultado';
import { AuthenticationService } from '../../../services/authentication.service';
import { ResultadoService } from '../../../services/resultado.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  paises:Pais[] = [];


  paisCorrecto!:Pais;
  paisesPregunta:Pais[] = [];
  preguntas:Pais[] = [];

  cantidadJugados:number = 1;
  cantidadAciertos:number = 0;

  displayModal:boolean = false;
  modalMsj1:string = '';
  modalMsj2: string = '';

  user:any;

  constructor(private paisService:PaisesService, private router:Router, private auth: AuthenticationService, private resultadoService: ResultadoService,) { 
    this.user = auth.getUserLoggedName();
  }

  ngOnInit(): void {
    this.setearJuego();
  }
  setearJuego(){
    this.paisService.traerPaises().subscribe(res =>{

      this.preguntas = [];
      this.paisesPregunta = [];
      this.paises = res;

      this.paisCorrecto= this.paises[this.randomNumber()]; 

      this.agregarPaisIncorrecto();

      this.preguntas = [...this.paisesPregunta];
      this.preguntas.push(this.paisCorrecto);

      this.preguntas = this.desordenarPreguntas(this.preguntas)

    })
  }

  reiniciar(){
    this.cantidadJugados++;
    this.setearJuego();
    this.displayModal = false;
  }

  terminarJuego(){
    

    const tiempo = new Date().getTime();
    const fecha = new Date(tiempo);    
    const fechaParseada = fecha.toString();

    let resultado: Resultado = {
      email: this.user.email,
      fecha: fechaParseada,
      juego: 'Preguntados',
    }

    this.resultadoService.enviarResultado(resultado);

    this.cantidadAciertos = 0;
  }

  

  agregarPaisIncorrecto(){

    for (let i = 0; i < 3; i++) {
      
      let paisAAgregar = this.paises[this.randomNumber()];
      while(paisAAgregar.name.common == this.paisCorrecto.name.common ){
        paisAAgregar = this.paises[this.randomNumber()];
      }
      
      this.paisesPregunta.push(paisAAgregar);
    }
    
  }

  respuestaSeleccionada(item:Pais){
    if(item.name.common == this.paisCorrecto.name.common){
      item.correcto = true;
      this.cantidadAciertos++;
    }
    else{
      setTimeout(() => {
        this.win();
      }, 500);
    }
  }

  desordenarPreguntas(array:Pais[]) {
    for (var i = array.length - 1; i > 0; i--) {
    
      
      var j = Math.floor(Math.random() * (i + 1));
                  
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
        
    return array;
  }
  
  randomNumber(){
    return Math.floor(Math.random() * this.paises.length);
  }

  mostrarModal(msj1:string,msj2:string){
    this.displayModal=true;
    this.modalMsj1 = msj1;
    this.modalMsj2 = msj2;
  }

  win() {
    Swal.fire({
      title: '¡Juego terminado!',
      text: `Tu resultado fue: ${this.cantidadAciertos}`,
      confirmButtonText: "Guardar e ir a Resultados",
      confirmButtonColor: '#6D4F92',
      background: '#E0E0E0',
      color: '#000000',
      heightAuto: false,
      cancelButtonColor: '#6D4F92',
      showCancelButton: true,
      cancelButtonText: 'Seguir jugando'
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        console.log("Entro 1")
        this.guardarDatos();
        this.reiniciar();
        this.router.navigateByUrl('resultados');
      } else {
        console.log("Entro 2")
        this.reiniciar();
      }
    });
  }
  
  guardarDatos() {
    const tiempo = new Date().getTime();
    const fecha = new Date(tiempo);    
    const fechaParseada = fecha.toString();
    let resultado: Resultado = {
      email: this.auth.getUserLoggedName(),
      fecha: fechaParseada,
      juego: 'Preguntados',
      resultado: this.cantidadAciertos
    }
    this.resultadoService.enviarResultado(resultado);
  
  }
}
