import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { cards  } from '../../../../environmentConfig';
import { Card } from '../../../interface/card';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ResultadoService } from '../../../services/resultado.service';
import { Resultado } from '../../../interface/resultado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {
  currentCard: Card | null = null;
  nextCard: Card | null = null;
  score: number = 0;
  message: string = '';
  imagenesDiccionario = cards;
  selectedImage: string | null = null;
  gameOver: boolean = false; 

  constructor(private router: Router, private resultadoService: ResultadoService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.startGame();
  }

  selectNumber(number: number) {
    const selected = this.imagenesDiccionario.find(item => item.number === +number);
    if (selected) {
      this.selectedImage = selected.image;
    } else {
      this.selectedImage = null;
    }
  }
  // Iniciar el juego
  startGame(): void {
    this.score = 0;
    this.message = '';
    this.currentCard = this.drawCard();
    this.nextCard = this.drawCard();
    this.gameOver = false; 

  }

  public drawCard(): Card {
    const value = Math.floor(Math.random() * 12) + 1;
    return { value, image: this.imagenesDiccionario[value].image };
  }

  // Comprobar si la siguiente carta es mayor
  guessHigher(): void {
    if (this.nextCard && this.currentCard) {
      if (this.nextCard.value > this.currentCard.value) {
        this.correctGuess();
      } else {
        this.wrongGuess();
      }
    }
  }

  // Comprobar si la siguiente carta es menor
  guessLower(): void {
    if (this.nextCard && this.currentCard) {
      if (this.nextCard.value < this.currentCard.value) {
        this.correctGuess();
      } else {
        this.wrongGuess();
      }
    }
  }

  // Lógica de acierto
  correctGuess(): void {
    this.score++;
    this.currentCard = this.nextCard;
    this.nextCard = this.drawCard();
  }

  // Lógica de error
  wrongGuess(): void {
    this.win();
    this.gameOver = true; 
  }

  win() {
    Swal.fire({
      title: '¡Juego terminado!',
      text: `Tu resultado fue: ${this.score}`,
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
        this.startGame();
        this.router.navigateByUrl('resultados');
      } else {
        console.log("Entro 2")
        this.startGame();
      }
    });
  }

  guardarDatos() {
    const tiempo = new Date().getTime();
    const fecha = new Date(tiempo);    
    const fechaParseada = fecha.toString();
    let resultado: Resultado = {
      email: this.authService.getUserLoggedName(),
      fecha: fechaParseada,
      juego: 'MayorMenor',
      resultado: this.score
    }
    this.resultadoService.enviarResultado(resultado);

  }
}
