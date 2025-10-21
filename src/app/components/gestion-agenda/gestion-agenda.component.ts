import { Component, OnInit } from '@angular/core';

interface RangoHorario {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

interface NuevoRangoInput {
  horaInicio: string;
  horaFin: string;
  isValid: boolean;
}

@Component({
  selector: 'app-gestion-agenda',
  templateUrl: './gestion-agenda.component.html',
  styleUrls: ['./gestion-agenda.component.css']
})
export class GestionAgendaComponent implements OnInit {

  fechaSeleccionada: Date = new Date(); 
  
  agendaMock: RangoHorario[] = [
    { id: 1, dia: this.formatFecha(new Date()), horaInicio: '08:00', horaFin: '12:00' },
    { id: 2, dia: this.formatFecha(new Date()), horaInicio: '14:00', horaFin: '18:00' },
    { id: 3, dia: this.formatFecha(this.getNextDay()), horaInicio: '09:00', horaFin: '13:00' },
  ];

  rangosDelDia: RangoHorario[] = []; 
  
  rangosNuevos: NuevoRangoInput[] = []; 

  constructor() { }

  ngOnInit(): void {
    this.aplicarFiltroFecha(this.fechaSeleccionada);
  }

  private getNextDay(): Date {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
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
    
    this.rangosDelDia = this.agendaMock.filter(r => r.dia === diaString);
        
    this.rangosNuevos = [];
  }

  agregarNuevoRango(): void {
    this.rangosNuevos.push({ 
      horaInicio: '', 
      horaFin: '', 
      isValid: false 
    });
  }
  
  validarRango(rango: NuevoRangoInput): void {
      const formatoValido = rango.horaInicio.length === 5 && rango.horaFin.length === 5;
      
      const secuenciaValida = rango.horaFin > rango.horaInicio;
                
      rango.isValid = formatoValido && secuenciaValida;
  }

  get puedeGuardar(): boolean {
      return this.rangosNuevos.length > 0 && this.rangosNuevos.every(r => r.isValid);
  }

  guardarAgenda(): void {
    if (!this.puedeGuardar) return;

    const diaGuardar = this.formatFecha(this.fechaSeleccionada);
    
    const nuevosRangosGuardados: RangoHorario[] = this.rangosNuevos.map(r => ({
      id: Math.floor(Math.random() * 1000) + 100,
      dia: diaGuardar,
      horaInicio: r.horaInicio,
      horaFin: r.horaFin,
    }));

    this.agendaMock = [...this.agendaMock, ...nuevosRangosGuardados];
    
    this.aplicarFiltroFecha(this.fechaSeleccionada); 

    alert('Agenda actualizada con éxito. ¡Horarios guardados!');
  }
  
  // Eliminar rango existente (mock)
  eliminarRangoExistente(rango: RangoHorario): void {
      if (confirm(`¿Está seguro que desea eliminar el rango ${rango.horaInicio} - ${rango.horaFin} del día ${rango.dia}?`)) {
          this.agendaMock = this.agendaMock.filter(r => r.id !== rango.id);
          this.aplicarFiltroFecha(this.fechaSeleccionada);
          alert('Rango eliminado (simulación).');
      }
  }

  // Eliminar rango que aún no se ha guardado
  eliminarNuevoRango(index: number): void {
      this.rangosNuevos.splice(index, 1);
  }
}