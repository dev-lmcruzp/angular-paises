import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  private _paises: Country[] = [];
  get paises(): Country[] { return [...this._paises]; }

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisServie: PaisService) { }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.hayError = false;
    this.paisServie.buscarPais(this.termino)
      // Consulta esta documentacón para el subscribe - deprecado
      // https://rxjs.dev/deprecations/subscribe-arguments
      .subscribe({
        //complete: () => {  }, // completeHandler
        error: () => {
          this.hayError = true;
          this._paises = [];
        }, // errorHandler 
        next: (response) => {
          console.log(response);
          this._paises = response;
        }, // nextHandler
      });
  }

  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    this.paisServie.buscarPais(termino)
      .subscribe({
        next: (response) => this.paisesSugeridos = response.splice(0, 5),
        error: () => this.paisesSugeridos = []
      })
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }

}