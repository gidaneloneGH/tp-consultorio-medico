import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RangoHorario, CrearAgendaPayload } from 'src/app/interfaces/agenda'; // Importamos las interfaces
import { respuestaApi } from '../coberturas/cobertura.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private api = "http://localhost:4000/api"
  private http = inject(HttpClient);

  obtenerAgendaPorDia(idMedico: number): Observable<RangoHorario[]> {

    const url = `${this.api}/obtenerAgenda/${idMedico}`;

    return this.http.get<respuestaApi<RangoHorario[]>>(url).pipe(
      map(response => {
        if (response.codigo === 200 && Array.isArray(response.payload)) {
          return response.payload.map(rango => ({
            ...rango,
            horaInicio: rango.hora_entrada ? rango.hora_entrada.substring(0, 5) : '',
            horaFin: rango.hora_salida ? rango.hora_salida.substring(0, 5) : ''
          }));
        }
        if (response.codigo === -1) {
          throw new Error(response.mensaje || 'Token inválido o no proporcionado.');
        }
        return [];
      }),
      catchError(error => {
        console.error('Error al obtener la agenda:', error);
        return throwError(() => new Error('Fallo en la comunicación al cargar la agenda.'));
      })
    );
  }

  crearAgenda(payload: CrearAgendaPayload): Observable<number> {
    const endpoint = "/crearAgenda"
    const url = this.api + endpoint

    return this.http.post<respuestaApi<any>>(url, payload).pipe(
      map(response => {
        if (response.codigo === 200) {
          const newId = response.payload?.[0]?.id_agenda;
          if (!newId) throw new Error('Agenda creada, pero no se recibió el ID.');
          return newId;
        }
        throw new Error(response.mensaje || 'Error desconocido al crear el rango de agenda.');
      }),
      catchError(error => {
        console.error('Error al crear la agenda:', error);
        return throwError(() => new Error('Fallo en la comunicación al guardar la agenda.'));
      })
    );
  }

  modificarAgenda(idAgenda: number, agenda: any){
    return this.http.put(`${this.api}/agenda/${idAgenda}`, agenda);
  }
}