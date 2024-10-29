import { Component } from '@angular/core';
import { Resultado } from '../../interface/resultado';
import { ResultadoService } from '../../services/resultado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {
  resultados: Resultado[] = [];
  resultadosFiltrados: Resultado[] = []; // Inicialmente vacío

  constructor(private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.resultadoService.traerResultados().subscribe(data => {
      this.resultados = data;
      this.ordenarResultadosPorPuntuacion(); // Ordenar después de obtener los resultados
      this.resetearFiltro(); // Mostrar todos los resultados filtrados al inicio
    });
  }

  // Filtra los resultados por juego y ordena por la mejor puntuación
  filtrarJuego(juego: string): void {
    switch (juego) {
      case 'Mayor o menor':
        juego = 'MayorMenor';
        break;
    }
    this.resultadosFiltrados = this.resultados
      .filter(item => item.juego === juego)
      .sort((a, b) => {
        const resultadoA = typeof a.resultado === 'string' ? this.timeToSeconds(a.resultado) : (a.resultado ?? 0);
        const resultadoB = typeof b.resultado === 'string' ? this.timeToSeconds(b.resultado) : (b.resultado ?? 0);

        if (typeof a.resultado === 'string' && typeof b.resultado === 'string') {
          return resultadoA - resultadoB; // Menor tiempo primero
        }
        if (typeof a.resultado === 'number' && typeof b.resultado === 'number') {
          return resultadoB - resultadoA; // Mayor número primero
        }
        return typeof a.resultado === 'string' ? -1 : 1; // Los tiempos van primero
      });
  }

  // Restaura todos los resultados sin filtro y ordenados
  resetearFiltro(): void {
    this.resultadosFiltrados = [...this.resultados];
    this.ordenarResultadosPorPuntuacion();
  }

  // Ordena por puntuación de mayor a menor
  private ordenarResultadosPorPuntuacion(): void {
    this.resultados.sort((a, b) => {
      const resultadoA = typeof a.resultado === 'string' ? this.timeToSeconds(a.resultado) : (a.resultado ?? 0);
      const resultadoB = typeof b.resultado === 'string' ? this.timeToSeconds(b.resultado) : (b.resultado ?? 0);
      return resultadoB - resultadoA; // Mayor primero
    });
  }

  timeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes * 60) + seconds;
  }

  formatTime(time: string): string {
    const [minutes, seconds] = time.split(':').map(Number);
    return `${Math.floor(minutes)}:${String(seconds).padStart(2, '0')}`; // Asegura que los segundos tengan 2 dígitos
  }
}
