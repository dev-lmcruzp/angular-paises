import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  private _paises: Country[] = [];
  get paises(): Country[] { return [...this._paises]; }

  constructor(private paisServie: PaisService) { }

  buscar(termino: string) {
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
    this.hayError = false;
    // TODO: crear sugerencias.
  }

}