import { Component, OnInit } from '@angular/core';

// Interfaz para los rangos de horario individuales de un médico
interface RangoHorario {
  horaInicio: string; // HH:MM
  horaFin: string; // HH:MM
}

// Interfaz que resume la disponibilidad de un médico para un día
interface AgendaMedicoDia {
  id: number;
  nombreMedico: string;
  apellidoMedico: string;
  especialidad: string;
  horarios: RangoHorario[]; // Lista de rangos cargados para el día
  horarioAtencionString: string; // Ej: "08:00 a 12:00, 14:00 a 18:00"
}

@Component({
  selector: 'app-inicio-operador',
  templateUrl: './inicio-operador.component.html',
  styleUrls: ['./inicio-operador.component.css']
})
export class InicioOperadorComponent implements OnInit {

  // Variables de control
  fechaSeleccionada: Date = new Date(); 
  
  agendaMedicosVisible: AgendaMedicoDia[] = []; 

  agendasMockDB = [
    { 
      id: 1, 
      nombreMedico: 'Carlos', 
      apellidoMedico: 'Pérez', 
      especialidad: 'Cardiología', 
      dias: {
        [this.formatFecha(new Date())]: [{ horaInicio: '08:00', horaFin: '12:00' }, { horaInicio: '15:00', horaFin: '19:00' }],
        [this.formatFecha(this.getNextDay())]: [{ horaInicio: '09:00', horaFin: '17:00' }]
      }
    },
    { 
      id: 2, 
      nombreMedico: 'Elena', 
      apellidoMedico: 'Fernández', 
      especialidad: 'Traumatología', 
      dias: {
        [this.formatFecha(new Date())]: [{ horaInicio: '10:00', horaFin: '14:00' }],
        [this.formatFecha(this.getPreviousDay())]: [{ horaInicio: '08:00', horaFin: '16:00' }]
      }
    },
    { 
      id: 3, 
      nombreMedico: 'Roberto', 
      apellidoMedico: 'García', 
      especialidad: 'Pediatría', 
      dias: {
        [this.formatFecha(new Date())]: [{ horaInicio: '14:00', horaFin: '18:00' }],
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.aplicarFiltroFecha(this.fechaSeleccionada);
  }

  private getNextDay(): Date {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
  }
  
  private getPreviousDay(): Date {
      const prevDay = new Date();
      prevDay.setDate(prevDay.getDate() - 1);
      return prevDay;
  }
  
  private formatFecha(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  esHoy(fecha: Date): boolean {
    return this.formatFecha(fecha) === this.formatFecha(new Date());
  }

  onDateChange(event: any): void {
      this.aplicarFiltroFecha(event.value);
  }

  aplicarFiltroFecha(nuevaFecha: Date | null): void {
    if (!nuevaFecha) return;

    this.fechaSeleccionada = nuevaFecha;
    const diaString = this.formatFecha(nuevaFecha);
    this.agendaMedicosVisible = [];

    for (const medicoAgenda of this.agendasMockDB) {
      const horariosDelDia = medicoAgenda.dias[diaString];
      
      if (horariosDelDia && horariosDelDia.length > 0) {
        
        const horarioString = horariosDelDia.map(h => `${h.horaInicio} a ${h.horaFin}`).join(', ');
        
        this.agendaMedicosVisible.push({
          id: medicoAgenda.id,
          nombreMedico: medicoAgenda.nombreMedico,
          apellidoMedico: medicoAgenda.apellidoMedico,
          especialidad: medicoAgenda.especialidad,
          horarios: horariosDelDia,
          horarioAtencionString: horarioString,
        });
      }
    }
  }

  editarAgenda(medico: AgendaMedicoDia): void {
    alert(`EDITAR: Simulando la edición de la agenda del Dr/a. ${medico.apellidoMedico} para el día ${this.formatFecha(this.fechaSeleccionada)}. Esto llevaría a una pantalla similar a la que tiene el médico.`);
    console.log('Médico a editar:', medico);
  }

  verTurnos(medico: AgendaMedicoDia): void {
    alert(`VER TURNOS: Mostrando los turnos confirmados del Dr/a. ${medico.apellidoMedico} para el día ${this.formatFecha(this.fechaSeleccionada)}. Aquí se listaría la hora, paciente y motivo.`);
    console.log('Médico a visualizar turnos:', medico);
  }
}