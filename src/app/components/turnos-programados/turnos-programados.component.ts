import { Component, OnInit } from '@angular/core';

interface Turno {
  id: number;
  fecha: Date;
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
  styleUrls: ['./turnos-programados.component.css']
})
export class TurnosProgramadosComponent implements OnInit {

  fechaActual: Date = new Date();
  fechaProxima: Date = new Date();
  
  turnosAgendaMock: Turno[] = [];
  
  fechaSeleccionada: Date = new Date();
  turnosVisibles: Turno[] = [];

  constructor() {
    this.fechaActual.setHours(0, 0, 0, 0);
    this.fechaProxima.setDate(this.fechaActual.getDate() + 1);
    this.fechaProxima.setHours(0, 0, 0, 0);
    
    this.mockearDatos();
  }

  ngOnInit(): void {
    this.aplicarFiltroFecha(this.fechaActual);
  }

  private mockearDatos(): void {
    this.turnosAgendaMock = [
      { id: 1, fecha: this.fechaActual, hora: '10:00', pacienteNombre: 'Ana', pacienteApellido: 'Sánchez', pacienteEdad: 35, notas: 'Revisión de estudios de laboratorio recientes.', detallesVisible: false },
      { id: 2, fecha: this.fechaActual, hora: '15:30', pacienteNombre: 'Pedro', pacienteApellido: 'López', pacienteEdad: 58, notas: 'Consulta por dolor crónico de rodilla, trae radiografías.', detallesVisible: false },
      { id: 3, fecha: this.fechaActual, hora: '09:00', pacienteNombre: 'Laura', pacienteApellido: 'Gómez', pacienteEdad: 22, notas: 'Continuación de tratamiento dermatológico. Cita de seguimiento.', detallesVisible: false },
      
      { id: 4, fecha: this.fechaProxima, hora: '11:00', pacienteNombre: 'Martín', pacienteApellido: 'Díaz', pacienteEdad: 45, notas: 'Primera consulta, chequeo general.', detallesVisible: false },
      { id: 5, fecha: this.fechaProxima, hora: '14:00', pacienteNombre: 'Sofía', pacienteApellido: 'Ruiz', pacienteEdad: 12, notas: 'Control pediátrico de rutina.', detallesVisible: false },
    ];
  }

  aplicarFiltroFecha(nuevaFecha: Date | null): void {
    if (!nuevaFecha) {
      return;
    }
    
    const diaSeleccionado = nuevaFecha.toLocaleDateString();
    this.fechaSeleccionada = nuevaFecha;

    let turnosFiltrados = this.turnosAgendaMock.filter(turno => 
      turno.fecha.toLocaleDateString() === diaSeleccionado
    );
    
    turnosFiltrados.sort((a, b) => {
        const horaA = parseInt(a.hora.replace(':', ''));
        const horaB = parseInt(b.hora.replace(':', ''));
        return horaA - horaB;
    });

    this.turnosVisibles = turnosFiltrados;
  }
  
  toggleNotas(turno: Turno): void {
    this.turnosVisibles.forEach(t => {
      if (t !== turno) {
        t.detallesVisible = false;
      }
    });
    turno.detallesVisible = !turno.detallesVisible;
  }
  
  onDateChange(event: any): void {
      this.aplicarFiltroFecha(event.value);
  }

  esHoy(fecha: Date): boolean {
    return fecha.toLocaleDateString() === this.fechaActual.toLocaleDateString();
  }
}