import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TurnoService } from 'src/app/services/turnos/turno.service';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
  pacienteNombre: string;
  pacienteApellido: string;
  pacienteEdad: number;
  notas: string;
  detallesVisible: boolean;
}

@Component({
  selector: 'app-turnos-programados',
  templateUrl: './turnos-programados.component.html',
  styleUrls: ['./turnos-programados.component.css'],
  providers: [DatePipe]
})
export class TurnosProgramadosComponent implements OnInit {

  private _turnoService = inject(TurnoService);
  private datePipe = inject(DatePipe);

  idMedico: number = Number(localStorage.getItem('USERID'));
  fechaSeleccionada: Date = new Date();

  turnosVisibles: Turno[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.cargarTurnos(this.fechaSeleccionada);
  }

  cargarTurnos(fecha: Date): void {
    this.isLoading = true;
    const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;

    this._turnoService.obtenerTurnosMedico(this.idMedico, fechaFormateada)
      .subscribe({
        next: (res) => {
          if (res.codigo === 200 && res.payload.length > 0) {
            this.turnosVisibles = res.payload.map((t: any) => {
              const [apellido, nombre] = t.nombre_paciente.split(',').map((x: string) => x.trim());

              const edad = this.calcularEdad(t.fecha_nacimiento);

              return {
                id: t.id_turno,
                fecha: t.fecha,
                hora: t.hora,
                pacienteNombre: nombre,
                pacienteApellido: apellido,
                pacienteEdad: edad,
                notas: t.nota || 'Sin notas registradas.',
                detallesVisible: false
              };
            });
          } else {
            this.turnosVisibles = [];
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Error al cargar turnos', err);
          this.isLoading = false;
        }
      });
  }

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  onDateChange(event: any): void {
    this.fechaSeleccionada = event.value;
    this.cargarTurnos(this.fechaSeleccionada);
  }

  esHoy(fecha: Date): boolean {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd') ===
           this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  toggleNotas(turno: Turno): void {
    this.turnosVisibles.forEach(t => {
      if (t !== turno) t.detallesVisible = false;
    });
    turno.detallesVisible = !turno.detallesVisible;
  }
}
