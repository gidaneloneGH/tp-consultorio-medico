import { Component, OnInit } from '@angular/core';

interface Especialidad {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-gestion-especialidades',
  templateUrl: './gestion-especialidades.component.html',
  styleUrls: ['./gestion-especialidades.component.css'] // Reutilizando estilos
})
export class GestionEspecialidadesComponent implements OnInit {

  especialidades: Especialidad[] = [
    { id: 10, nombre: 'Cardiología' },
    { id: 20, nombre: 'Traumatología' },
    { id: 30, nombre: 'Pediatría' },
    { id: 40, nombre: 'Dermatología' },
  ];
  
  medicosConEspecialidad: { [key: number]: number[] } = {
    40: [201, 205], 
    10: [202],
  };

  nuevaEspecialidadNombre: string = '';
  especialidadEditada: Especialidad | null = null;

  constructor() { }

  ngOnInit(): void { }

  crearEspecialidad(): void {
    if (this.nuevaEspecialidadNombre.trim() === '') {
      alert('El nombre de la especialidad no puede estar vacío.');
      return;
    }
    
    const nuevaId = Math.max(...this.especialidades.map(e => e.id)) + 10;
    this.especialidades.push({ id: nuevaId, nombre: this.nuevaEspecialidadNombre.trim() });
    this.nuevaEspecialidadNombre = '';
    alert('Especialidad creada con éxito.');
  }

  iniciarEdicion(especialidad: Especialidad): void {
    this.especialidadEditada = { ...especialidad }; 
  }

  guardarEdicion(): void {
    if (!this.especialidadEditada || this.especialidadEditada.nombre.trim() === '') {
      alert('El nombre de la especialidad no puede estar vacío.');
      return;
    }
    
    const index = this.especialidades.findIndex(e => e.id === this.especialidadEditada!.id);
    if (index !== -1) {
      this.especialidades[index].nombre = this.especialidadEditada.nombre.trim();
      alert('Especialidad modificada con éxito.');
    }
    this.especialidadEditada = null; 
  }

  eliminarEspecialidad(especialidadId: number, especialidadNombre: string): void {
    
    const tieneAsociaciones = this.medicosConEspecialidad[especialidadId]?.length > 0;
    
    if (tieneAsociaciones) {
      alert(`ERROR: La especialidad "${especialidadNombre}" no puede ser eliminada porque ${this.medicosConEspecialidad[especialidadId].length} médico(s) la tienen asociada.`);
      return;
    }

    if (confirm(`¿Está seguro que desea eliminar la especialidad: "${especialidadNombre}"?`)) {
      this.especialidades = this.especialidades.filter(e => e.id !== especialidadId);
      alert('Especialidad eliminada con éxito.');
    }
  }

  cancelarEdicion(): void {
    this.especialidadEditada = null;
  }
}