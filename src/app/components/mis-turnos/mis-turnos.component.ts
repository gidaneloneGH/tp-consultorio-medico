import { Component, OnInit } from '@angular/core';

interface Turno {
  id: number;
  fecha: Date;
  hora: string;
  especialista: string;
  especialidad: string;
  detallesVisible: boolean; 
}

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public date = Date;

  turnos: Turno[] = [
    { 
      id: 1, 
      fecha: new Date(2025, 10, 25), // Nov 25, 2025
      hora: '10:00', 
      especialista: 'Dr. Juan Pérez', 
      especialidad: 'Cardiología', 
      detallesVisible: false 
    },
    { 
      id: 2, 
      fecha: new Date(2025, 10, 28), // Nov 28, 2025
      hora: '15:30', 
      especialista: 'Dra. Ana García', 
      especialidad: 'Pediatría', 
      detallesVisible: false 
    },
    { 
      id: 3, 
      fecha: new Date(2025, 11, 5), // Dec 5, 2025
      hora: '09:00', 
      especialista: 'Dr. Pedro Luis Peréz', 
      especialidad: 'Traumatología', 
      detallesVisible: false 
    },
    { 
      id: 4, 
      fecha: new Date(2025, 9, 15), // Oct 15, 2025 (Pasado)
      hora: '11:00', 
      especialista: 'Dr. Juan Pérez', 
      especialidad: 'Cardiología', 
      detallesVisible: false 
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.ordenarTurnos();
  }

  private ordenarTurnos(): void {
    this.turnos.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  }

  toggleDetalles(turno: Turno): void {
    this.turnos.forEach(t => {
      if (t !== turno) {
        t.detallesVisible = false;
      }
    });
    turno.detallesVisible = !turno.detallesVisible;
  }

  formatearFechaDetallada(fecha: Date, hora: string): string {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const diaSemanaMes = fecha.toLocaleDateString('es-ES', opciones);
    const primeraLetra = diaSemanaMes.charAt(0).toUpperCase();
    const resto = diaSemanaMes.slice(1);
    
    return `${primeraLetra}${resto} a las ${hora} horas`;
  }
}