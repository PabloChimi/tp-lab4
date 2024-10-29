import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultadoService } from '../../../services/resultado.service';
import { Resultado } from '../../../interface/resultado';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, RouterLink],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
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
  resultado = 0; // Resultado del juego
  gameWon: boolean = false;
  gameLost: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private resultadoService: ResultadoService, private authService: AuthenticationService) {
    this.restartGame();
  }

  ngOnInit(): void {
    if (!this.gameOver) {
      this.restartGame();
    }
  }

  restartGame() {
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.attemptsLeft = 6;
    this.resultado = 0; // Reinicia el resultado al comenzar un nuevo juego
    this.gameOver = false;
    this.gameWon = false;
    this.gameLost = false;
    this.guessedLetters = []; // Reinicia las letras adivinadas
  }

  restartGameWithAttempts() {
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.gameOver = false;
    this.gameWon = false;
    this.gameLost = false;
    this.guessedLetters = []; // Reinicia las letras adivinadas
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
        this.attemptsLeft--; // Resta un intento si es incorrecto
      }
    }
    this.checkGameState();
  }

  checkGameState() {
    if (this.isGameWon()) {
      this.gameWon = true;
      this.resultado++; // Suma 1 al resultado solo cuando se gana
      this.gameOver = true; // Termina el juego si gana
      if(this.attemptsLeft > 0) {
        console.log("Entro al attempts mayor 0")
        this.restartGameWithAttempts()
      }else  {
        console.log("Entro al attempts menor 0")

        this.win(); // Muestra la ventana de ganador
      }
    }

    if (this.isGameLost()) {
      this.gameLost = true;
      this.gameOver = true; // Termina el juego si pierde
      this.win(); // Muestra la ventana de ganador

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
    return this.attemptsLeft <= 0 && !this.gameWon;
  }

  // Comprobar si el jugador ha ganado
  isGameWon(): boolean {
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
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
      if (result.isConfirmed) {
        this.guardarDatos();
        this.restartGame(); // Reinicia el juego después de guardar
        this.router.navigateByUrl('resultadosJuegos');
      } else {
        this.restartGame(); // Reinicia el juego al continuar jugando
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
