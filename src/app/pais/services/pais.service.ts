import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';
// import { catchError } from 'rxjs/operators'; //Para manejo de errores.

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private _baseUrl: string = 'https://restcountries.com/v2';
  private get _params():HttpParams { return new HttpParams().set('fields', 'flags,name,capital,population,alpha2Code'); }
  //
  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {
    var url = `${this._baseUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this._params });
    // .pipe(
    //   catchError(error => of([]))
    // ); // para manejo de error, si sucede un error devuelve un arreglo vacío.
  }

  buscarCapital(termino: string): Observable<Country[]> {
    var url = `${this._baseUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this._params });
  }

  getPaisByAlpha(id: string): Observable<Country> {
    var url = `${this._baseUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  getPaisByRegion(id: string): Observable<Country[]> {
    var url = `${this._baseUrl}/regionalbloc/${id}`;
    return this.http.get<Country[]>(url, { params: this._params })
      .pipe(
        tap(console.log)
      );
  }
}