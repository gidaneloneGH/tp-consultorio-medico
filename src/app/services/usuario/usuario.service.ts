import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { respuestaApi } from '../coberturas/cobertura.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api = "http://localhost:4000/api"

  constructor(
    private http: HttpClient
  ) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    const endpoint = "/obtenerUsuarios"
    const url = this.api + endpoint

    return this.http.get<respuestaApi<Usuario[]>>(url).pipe(
      map(response => {
        if (response.codigo === 200) {
          return response.payload;
        }

        if (response.codigo === -1) {
          throw new Error(response.mensaje || 'Token inválido o no proporcionado.');
        }

        throw new Error(response.mensaje || 'Error al obtener la lista de usuarios.');
      }),
      catchError(error => {
        console.error('Error en obtenerUsuarios:', error);
        return throwError(() => new Error('Fallo en la comunicación con el servidor.'));
      })
    );
  }

  obtenerUsuarioPorId(id: string): Observable<Usuario> {
    const url = `${this.api}/obtenerUsuario/${id}`;

    return this.http.get<respuestaApi<Usuario[]>>(url).pipe(
      map(response => {
        if (response.codigo === 200 && response.payload && response.payload.length === 1) {
          return response.payload[0];
        }
        if (response.codigo === -1) {
          throw new Error(response.mensaje || 'Token inválido o no proporcionado.');
        }
        throw new Error(response.mensaje || 'Usuario no encontrado o error en el formato de respuesta.');
      }),
      catchError(error => {
        console.error(`Error en obtenerUsuarioPorId (${id}):`, error);
        return throwError(() => new Error('Fallo en la comunicación con el servidor.'));
      })
    );
  }


  actualizarUsuario(id: string, usuario: Partial<Usuario>): Observable<respuestaApi<Usuario>> {
    const url = `${this.api}/actualizarUsuario/${id}`;

    return this.http.put<respuestaApi<Usuario>>(url, usuario).pipe(
      map(response => {
        if (response.codigo === 200) {
          return response;
        }
        throw new Error(response.mensaje || 'Fallo al actualizar el usuario.');
      }),
      catchError(error => {
        console.error(`Error en actualizarUsuario (${id}):`, error);
        return throwError(() => new Error('Fallo en la comunicación con el servidor al actualizar.'));
      })
    );
  }
}
