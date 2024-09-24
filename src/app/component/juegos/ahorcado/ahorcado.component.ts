import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [ CommonModule, NgComponentOutlet],
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

  constructor(){
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1];
  }

  ngOnInit(): void {
    if(!this.gameOver) {
      this.restartGame();
    }
  }

  restartGame() {
    this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1];
    this.attemptsLeft = 6;
    this.guessedLetters = [];
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
  }

  // Mostrar la palabra con las letras adivinadas
  getDisplayedWord(): string[] {
    return this.secretWord
      .split('')
      .map(letter => (this.guessedLetters.includes(letter) ? letter : '_'));
  }

  // Comprobar si el jugador ha perdido
  isGameLost(): boolean {
    var gameLost = this.attemptsLeft <= 0;
    if(gameLost) {
      this.gameOver = true;
    }
    return gameLost;
  }

  // Comprobar si el jugador ha ganado
  isGameWon(): boolean {
    var gameLost = this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
    if(gameLost) {
      this.gameOver = true;
    }
    return gameLost;
  }
}
