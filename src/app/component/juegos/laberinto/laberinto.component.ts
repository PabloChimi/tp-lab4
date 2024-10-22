import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-laberinto',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './laberinto.component.html',
  styleUrl: './laberinto.component.css'
})
export class LaberintoComponent implements OnInit{
  maze: number[][] = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  seconds : number = 0;
  intervalId: any;
  tiempoJugador : any;

  // playerPosition = { x: 1, y: 1 };
  // playerPixelPosition = { top: 20, left: 20 }; // Empieza en la posición (1, 1) de la cuadrícula.
  
  ngOnInit() {
    this.maze = this.generateRandomMaze(11); // Generar el laberinto aleatorio
  
    this.startTimer();
    // Inicializar posición del jugador
    this.playerPosition = { x: 1, y: 1 };
    this.playerPixelPosition = {
      top: this.playerPosition.x * (this.cellSize + this.gapSize),
      left: this.playerPosition.y * (this.cellSize )
    };
  }
  
  cellSize = 60;
  gapSize = 3;
  
  playerPosition = { x: 1, y: 1 };
  playerPixelPosition = {
    top: this.playerPosition.x * (this.cellSize + this.gapSize),
    left: this.playerPosition.y * (this.cellSize)
  };
  
  movePlayer(direction: string) {
    const { x, y } = this.playerPosition;
    let newX = x;
    let newY = y;
  
    if (direction === 'up' && this.maze[x - 1][y] === 0) {
      newX--;
    } else if (direction === 'down' && this.maze[x + 1][y] === 0) {
      newX++;
    } else if (direction === 'left' && this.maze[x][y - 1] === 0) {
      newY--;
    } else if (direction === 'right' && this.maze[x][y + 1] === 0) {
      newY++;
    }
  
    // Actualizar posición solo si ha cambiado
    if (newX !== x || newY !== y) {
      this.playerPosition = { x: newX, y: newY };
  
      // Calcular la posición en píxeles considerando el gap y ajustando para centrar
      this.playerPixelPosition.top = newX * (this.cellSize + this.gapSize);
      console.log("newY: " + newY + " | " + "cellsize: " + this.cellSize + " + GapSize: | " + this.gapSize)
      this.playerPixelPosition.left = newY * (this.cellSize); // Ajustar el cálculo restando gapSize para corregir el desplazamiento
      console.log("playerPixelPosition.left: " + this.playerPixelPosition.left )
      // Verificar si ha llegado a la salida
      this.checkIfGameWon();
    }
  }
  

@HostListener('window:keydown', ['$event'])
handleKeyDown(event: KeyboardEvent) {
  switch(event.key) {
    case 'ArrowUp':
      this.movePlayer('up');
      break;
    case 'ArrowDown':
      this.movePlayer('down');
      break;
    case 'ArrowLeft':
      this.movePlayer('left');
      break;
    case 'ArrowRight':
      this.movePlayer('right');
      break;
  }
}

generateRandomMaze(size: number): number[][] {
  const maze = Array(size).fill(0).map(() => Array(size).fill(1));

  const stack: { x: number, y: number }[] = [];
  const directions = [
    { x: -2, y: 0 },  // Arriba
    { x: 2, y: 0 },   // Abajo
    { x: 0, y: -2 },  // Izquierda
    { x: 0, y: 2 }    // Derecha
  ];

  const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const isValidMove = (x: number, y: number) => {
    return x > 0 && y > 0 && x < size - 1 && y < size - 1 && maze[x][y] === 1;
  };

  const carvePath = (x: number, y: number) => {
    maze[x][y] = 0;
    shuffle(directions).forEach(direction => {
      const newX = x + direction.x;
      const newY = y + direction.y;
      if (isValidMove(newX, newY)) {
        maze[(x + newX) / 2][(y + newY) / 2] = 0;  // Quita la pared entre las celdas
        carvePath(newX, newY);
      }
    });
  };

  // Inicia desde una celda aleatoria
  const startX = Math.floor(Math.random() * (size / 2)) * 2 + 1;
  const startY = Math.floor(Math.random() * (size / 2)) * 2 + 1;
  carvePath(startX, startY);

  return maze;
}

exitPosition = { x: 9, y: 9 };  // Define una salida en el laberinto

checkIfGameWon() {
  if (this.playerPosition.x === this.exitPosition.x && this.playerPosition.y === this.exitPosition.y) {
    this.tiempoJugador = this.formatTime()
    this.stopTimer();
    alert("¡Has ganado en: " + this.tiempoJugador);
  }
}

startTimer() {
  this.intervalId = setInterval(() => {
    this.updateTimer();
  }, 1000);
}

updateTimer() {
  this.seconds++;
}

formatTime() {
  const minutes = Math.floor(this.seconds / 60);
  const remainingSeconds = this.seconds % 60;
  return `${this.padTime(minutes)}:${this.padTime(remainingSeconds)}`;
}

padTime(time: number) {
  return time < 10 ? `0${time}` : time;
}

stopTimer(){
  this.seconds = 0;
  clearInterval(this.intervalId);
}

}
