import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  pais!: Country;
  constructor(private activateRoute: ActivatedRoute
    , private paisService: PaisService) { }

  ngOnInit(): void {
    // this.activateRoute.params
    //   .subscribe(({ id }) /* Se aplica desestructuración */ => {
    //     console.log(id);

    //     this.paisService.getPaisByAlpha(id)
    //       .subscribe({
    //         error: () => { },
    //         next: (response) => {
    //           console.log(response);
    //         },
    //       });
    //   })

    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.getPaisByAlpha(id) )
        , tap(console.log)
      )
      .subscribe(response => this.pais = response)
  }
}
