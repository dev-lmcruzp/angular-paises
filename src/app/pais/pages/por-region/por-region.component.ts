import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
      button{
        margin-right: 5px
      }
    `
  ]
})
export class PorRegionComponent {
  regiones: string[] = [
    'EU', 'EFTA', 'CARICOM', 'PA', 'AU', 
    'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS',
    'CEFTA', 'NAFTA', 'SAARC'
  ];
  regionActiva: string = '';

  hayError: boolean = false;
  private _paises: Country[] = [];
  get paises(): Country[] { return [...this._paises]; }

  constructor(private paisService: PaisService) { }

  getClaseCss = (region: string): string => this.regionActiva === region ? 'btn btn-primary' : 'btn btn-outline-primary';

  activarRegion(region: string) {
    if(region === this.regionActiva) return;
    this.hayError = false;
    this.regionActiva = region;
    this._paises = [];

    this.paisService.getPaisByRegion(region)
      .subscribe({
        error: (error) => { this.hayError = true; },
        next: (response) => { this._paises = response; }
      });
  }
}