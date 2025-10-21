import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Interfaces para tipar los datos mockeados
interface Especialidad {
  id: number;
  nombre: string;
}

interface Profesional {
  id: number;
  id_especialidad: number; // Para el filtro
  nombre: string;
}

interface Horario {
  id: number;
  hora: string;
}

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {

  coberturaUsuario: string = "IAPOS";
  
  especialidades: Especialidad[] = [
    { id: 1, nombre: 'Cardiología' },
    { id: 2, nombre: 'Traumatología' },
    { id: 3, nombre: 'Pediatría' },
  ];

  profesionalesMock: Profesional[] = [
    { id: 101, id_especialidad: 1, nombre: 'Dr. Mateo González' },
    { id: 102, id_especialidad: 1, nombre: 'Dra. Maria Pérez' },
    { id: 201, id_especialidad: 2, nombre: 'Dr. Gustavo Costas' },
    { id: 301, id_especialidad: 3, nombre: 'Dra. Sol Díaz' },
  ];

  horariosMock: Horario[] = [
    { id: 1, hora: '09:00 hs' },
    { id: 2, hora: '10:30 hs' },
    { id: 3, hora: '14:00 hs' },
  ];

  especialidadSeleccionada: Especialidad | null = null;
  profesionalSeleccionado: Profesional | null = null;
  fechaSeleccionada: Date | null = null;
  horaSeleccionada: Horario | null = null;
  notaTurno: string = '';

  profesionalesFiltrados: Profesional[] = [];
  
  get formularioCompleto(): boolean {
    return !!this.especialidadSeleccionada &&
           !!this.profesionalSeleccionado &&
           !!this.fechaSeleccionada &&
           !!this.horaSeleccionada &&
           this.notaTurno.trim().length > 0;
  }

  get segundoPasoHabilitado(): boolean {
  return !!this.especialidadSeleccionada;
  }

  get tercerPasoHabilitado(): boolean {
    return !!this.profesionalSeleccionado;
  }

  get cuartoPasoHabilitado(): boolean {
    return !!this.fechaSeleccionada;
  }

  get quintoPasoHabilitado(): boolean {
    return !!this.horaSeleccionada;
  }

  constructor(private router: Router){}


  ngOnInit(): void {

  }

  seleccionarEspecialidad(especialidad: Especialidad): void {
    this.especialidadSeleccionada = especialidad;
    
    this.profesionalSeleccionado = null;
    this.fechaSeleccionada = null;
    this.horaSeleccionada = null;
    this.notaTurno = '';

    this.profesionalesFiltrados = this.profesionalesMock.filter(p => 
      p.id_especialidad === especialidad.id
    );
  }

  seleccionarProfesional(profesional: Profesional): void {
    this.profesionalSeleccionado = profesional;
    this.fechaSeleccionada = null;
    this.horaSeleccionada = null;
    this.notaTurno = '';
  }

  seleccionarFecha(fecha: Date): void {
    this.fechaSeleccionada = fecha;
    this.horaSeleccionada = null;
    this.notaTurno = '';
  }

  seleccionarHora(hora: Horario): void {
    this.horaSeleccionada = hora;
    this.notaTurno = '';
  }
  
  confirmarTurno(): void {
    if (this.formularioCompleto) {
        const mensaje = `Turno confirmado con ${this.profesionalSeleccionado?.nombre} el día ${this.fechaSeleccionada?.toLocaleDateString()} a las ${this.horaSeleccionada?.hora}`;
        alert(mensaje); // Simula el pop-up
    }
  }

  cancelar(): void {
    alert('Cancelando solicitud y volviendo a la pantalla principal.');
    this.router.navigate(['/inicio-paciente']) ;
  }
}