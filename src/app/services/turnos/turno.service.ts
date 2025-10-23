import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private api = "http://localhost:4000/api"
  private http = inject(HttpClient);

  constructor() { }

  obtenerTurnosMedico(id_medico: number, fecha: string): Observable<any> {
    return this.http.post(`${this.api}/obtenerTurnosMedico`, { id_medico, fecha });
  }

  obtenerTurnosPaciente(idPaciente: number){
    return this.http.get<any>(`${this.api}/obtenerTurnoPaciente/${idPaciente}`);

  }

  asignarTurno(turno: any): Observable<any> {
    return this.http.post(`${this.api}/asignarTurnoPaciente`, turno);
  }

  eliminarTurno(idTurno: number){
    return this.http.delete<any>(`${this.api}/eliminarTurnoPaciente/${idTurno}`);
  }

  actualizarTurno(idTurno: number, datosTurno: any): Observable<any> {
    return this.http.put<any>(`${this.api}/actualizarTurnoPaciente/${idTurno}`, datosTurno);
  }
}
