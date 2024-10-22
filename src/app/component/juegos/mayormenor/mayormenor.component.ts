import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { cards  } from '../../../../environmentConfig';
import { Card } from '../../../interface/card';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [ CommonModule ],
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

  constructor() { }

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
    this.message = '¡Te equivocaste! Tu puntuación es: ' + this.score;
    this.gameOver = true; 
  }
}
