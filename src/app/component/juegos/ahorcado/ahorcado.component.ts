import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultadoService } from '../../../services/resultado.service';
import { Resultado } from '../../../interface/resultado';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  secretWord: string = 'ANGULAR';
  wordList: string[] = ['ANGULAR', 'PIEDRA', 'LABORATORIO', 'JUEGOS', 'PREGUNTADOS', 'AHORCADO'];
  // Estado de las letras adivinadas
  guessedLetters: string[] = [];
  // Letras disponibles para clickear
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  // Intentos restantes
  attemptsLeft: number = 6;
  gameOver: boolean = false;
  resultado = 0;
  gameWon: boolean = false;
  gameLost: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private resultadoService: ResultadoService, private authService: AuthenticationService) {
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1];
  }

  ngOnInit(): void {
    if (!this.gameOver) {
      this.restartGame();
    }
  }

  restartGame() {
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1];
    this.attemptsLeft = 6;
    this.resultado = 0;
    this.gameOver = false;
    this.gameWon = false;
    this.gameLost = false;
    this.guessedLetters = [];
  }

  restartGameWithAttempts() {
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1];
    this.guessedLetters = [];
    // this.cdr.detectChanges();
  }

  // Obtener el estado de una letra
  isLetterGuessed(letter: string): boolean {
    return this.guessedLetters.includes(letter);
  }

  // Evento cuando una letra es seleccionada
  onLetterClick(letter: string): void {
    if (!this.isLetterGuessed(letter)) {
      this.guessedLetters.push(letter);
      if (!this.secretWord.includes(letter)) {
        this.attemptsLeft--;
      }
    }
    this.checkGameState();
  }

  checkGameState() {
    if (this.isGameWon()) {
      this.gameWon = true;
    }

    if (this.isGameLost()) {
      this.gameLost = true;
    }
  }

  // Mostrar la palabra con las letras adivinadas
  getDisplayedWord(): string[] {
    if (this.secretWord == null) {
      return [];
    }
    return this.secretWord
      .split('')
      .map(letter => (this.guessedLetters.includes(letter) ? letter : '_'));
  }

  // Comprobar si el jugador ha perdido
  isGameLost(): boolean {
    var gameLost = this.attemptsLeft <= 0;
    if (gameLost) {
      console.log("Entro al lost")

      this.gameOver = true;
      this.win();
    }
    return gameLost;
  }

  // Comprobar si el jugador ha ganado
  isGameWon(): boolean {
    var gameLost = this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
    if (gameLost) {
      if (this.attemptsLeft > 0) {
        this.resultado++;
        this.restartGameWithAttempts()
        this.gameOver = false;
      } else {
        this.gameOver = true;
        console.log("Entro al win")
        this.win();
      }
    }
    return gameLost;
  }

  win() {
    Swal.fire({
      title: '¡Juego terminado!',
      text: `Tu resultado fue: ${this.resultado}`,
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
        this.restartGame();
        this.router.navigateByUrl('resultados');
      } else {
        console.log("Entro 2")
        this.restartGame();
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
      juego: 'Ahorcado',
      resultado: this.resultado
    }
    this.resultadoService.enviarResultado(resultado);

  }
}
