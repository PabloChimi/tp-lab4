import { Component } from '@angular/core';
import { ResultadoService } from '../../services/resultado.service';
import { ResultadoEncuesta } from '../../interface/resultadoEncuesta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado-encuesta',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './resultado-encuesta.component.html',
  styleUrl: './resultado-encuesta.component.css'
})
export class ResultadoEncuestaComponent {
  resultados: ResultadoEncuesta[] = [];
  constructor(private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.resultadoService.traerResultadosEncuesta().subscribe(data =>{
      this.resultados = data;
    })
  }
}
