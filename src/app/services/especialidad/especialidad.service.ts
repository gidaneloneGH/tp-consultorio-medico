import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { UtilService } from '../util.service';
import { respuestaApi } from '../coberturas/cobertura.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private api = "http://localhost:4000/api"

  private http = inject(HttpClient);
  private _utilService = inject(UtilService);


  getEspecialidades(): Observable<Especialidad[]> {
    const endpoint = "/obtenerEspecialidades"
    const url = this.api + endpoint

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.codigo === 200 && response.payload) {
          return response.payload.map((e: any) => ({
            id: e.id,
            descripcion: e.descripcion
          })) as Especialidad[];
        }
        return [];
      })
    );
  }


  crearEspecialidad(nombre: string): Observable<Especialidad> {
    const endpoint = "/crearEspecialidad"
    const url = this.api + endpoint

    const data = { descripcion: nombre.trim() };
    return this.http.post<Especialidad>(url, data);
  }


  modificarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    const endpoint = "/modificarEspecialidad"
    const url = this.api + endpoint

    return this.http.put<respuestaApi<Especialidad>>(url, especialidad).pipe(
      map(response => {
        if (response.codigo === 200) {
          return especialidad;
        } else {
          throw new Error(response.mensaje || 'Error desconocido al modificar especialidad.');
        }
      }),
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al modificar.'));
      })
    );
  }


  eliminarEspecialidad(id: number): Observable<Especialidad> {
    const endpoint = "/eliminarEspecialidad"
    const url = `${this.api}${endpoint}/${id}`

    return this.http.delete<respuestaApi<Especialidad>>(url).pipe(
      map(response => {
        if (response && response.codigo === 200) {
          return response.payload;
        } else if (response.codigo === -2) {
          throw new Error(response.mensaje);
        } else {
          throw new Error(response.mensaje || 'Error desconocido al eliminar especialidad.');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el servicio DELETE:', error);
        return throwError(() => new Error(error.error.mensaje));
      })
    );
  }


  getEspecialidadesPorMedico(idMedico: number): Observable<any> {
    return this.http.get(`${this.api}/obtenerEspecialidadesMedico/${idMedico}`);
  }


  crearAsociacionMedicoEspecialidad(idMedico: number, idEspecialidad: number): Observable<any> {
    const endpoint = "/obtenerEspecialidadesMedico"
    const url = this.api + endpoint

    const data = { id_medico: idMedico, id_especialidad: idEspecialidad };
    return this.http.post<any>(url, data);
  }

  getMedicosPorEspecialidad(id_especialidad: number): Observable<any> {
    return this.http.get(`${this.api}/obtenerMedicoPorEspecialidad/${id_especialidad}`);
  }

}
