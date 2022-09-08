import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  private _paises: Country[] = [];
  get paises(): Country[] { return [...this._paises]; }

  constructor(private paisServie: PaisService) { }

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.paisServie.buscarCapital(this.termino)
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

}