import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cobertura } from 'src/app/interfaces/cobertura';

export interface respuestaApi<T>{
  codigo: number;
  mensaje: string;
  payload: T;
}

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  private api = "http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  getTodasCoberturas(): Observable<Cobertura[]> {
    const endpoint = "/obtenerCoberturas"
    const url = this.api + endpoint

    return this.http.get<respuestaApi<Cobertura[]>>(url).pipe(
      map(response => {
        if (response.codigo === 200) {
          return response.payload; 
        } else {
          throw new Error(response.mensaje || 'Error desconocido al obtener coberturas.');
        }
      }),
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Fallo la conexión o la api: ' + (error.message || error.statusText)));
      })
    );
  }

  crearCobertura(nombre: string): Observable<Cobertura> {
    const endpoint = "/crearCobertura"
    const url = this.api + endpoint

    const data = { nombre: nombre };

    return this.http.post<respuestaApi<any>>(url, data).pipe(
        map(response => {
            if (response.codigo === 200 && response.payload && response.payload[0]) {
                const nuevoId = response.payload[0].id_cobertura;
                return { id_cobertura: nuevoId, nombre: nombre } as Cobertura;
            } else {
                throw new Error(response.mensaje || 'Error desconocido al crear cobertura.');
            }
        }),
        catchError(error => {
            console.error('Error en el servicio:', error);
            return throwError(() => new Error('Fallo la conexión o la api: ' + (error.message || error.statusText)));
        })
    );
  }

}
