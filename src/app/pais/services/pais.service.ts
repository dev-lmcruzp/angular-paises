import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
// import { catchError } from 'rxjs/operators'; //Para manejo de errores.

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private baseUrl: string = 'https://restcountries.com/v2';

  //
  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {
    var url = `${this.baseUrl}/name/${termino}`;
    return this.http.get<Country[]>(url);
    // .pipe(
    //   catchError(error => of([]))
    // ); // para manejo de error, si sucede un error devuelve un arreglo vacío.
  }

  buscarCapital(termino: string): Observable<Country[]> {
    var url = `${this.baseUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url);
  }

  getPaisByAlpha(id: string): Observable<Country> {
    var url = `${this.baseUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

}