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
  constructor(private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.resultadoService.traerResultados().subscribe(data =>{
      this.resultados = data;
    })
  }
}
