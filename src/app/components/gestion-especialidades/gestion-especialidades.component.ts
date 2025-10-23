import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; // Importamos FormControl
import { HttpErrorResponse } from '@angular/common/http';

import { Especialidad } from 'src/app/interfaces/especialidad'; 
import { UtilService } from 'src/app/services/util.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';

@Component({
  selector: 'app-gestion-especialidades',
  templateUrl: './gestion-especialidades.component.html',
  styleUrls: ['./gestion-especialidades.component.css']
})
export class GestionEspecialidadesComponent implements OnInit {

  especialidades: Especialidad[] = []; 
  altaForm: FormGroup;
  edicionControl: FormControl;
  especialidadEditada: Especialidad | null = null;
  errorMessage: string | null = null; 
  medicosConEspecialidadCount: { [key: number]: number } = {}; 
  
  private fb = inject(FormBuilder);
  private _especialidadService = inject(EspecialidadService);
  private _utilService = inject(UtilService);

  constructor() {
    this.altaForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]]
    });
    
    this.edicionControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  crearEspecialidad(): void {
    if (this.altaForm.invalid) return;

    const nombre = this.altaForm.value.descripcion;

    this._especialidadService.crearEspecialidad(nombre).subscribe({
      next: () => {
        this._utilService.openSnackBar('Especialidad creada con éxito.');
        this.altaForm.reset({ nombre: '' }); // Resetear solo el formulario de alta
        this.cargarEspecialidades(); 
      },
      error: (err: HttpErrorResponse) => {
        this._utilService.openSnackBar(`Error al crear: ${err.error?.mensaje || 'Error desconocido.'}`);
        console.error(err);
      }
    });
  }
  
  guardarEdicion(): void {
    if (!this.especialidadEditada || this.edicionControl.invalid) return;
    
    const nuevoNombre = this.edicionControl.value;

    const especialidadActualizada: Especialidad = {
        id: this.especialidadEditada.id,
        descripcion: nuevoNombre
    };

    this._especialidadService.modificarEspecialidad(especialidadActualizada).subscribe({
      next: () => {
        this._utilService.openSnackBar('Especialidad modificada con éxito.');
        this.cancelarEdicion();
        this.cargarEspecialidades(); 
      },
      error: (err: HttpErrorResponse) => {
        this._utilService.openSnackBar(`Error al modificar: ${err.error?.mensaje || 'Error desconocido.'}`);
        console.error(err);
      }
    });
  }
  
  iniciarEdicion(especialidad: Especialidad): void {
    this.especialidadEditada = { ...especialidad }; 
    this.edicionControl.setValue(especialidad.descripcion);
    this.edicionControl.markAsUntouched();
    this.edicionControl.markAsPristine();
  }

  cancelarEdicion(): void {
    this.especialidadEditada = null;
    this.edicionControl.reset();
  }

  cargarEspecialidades(): void {
    this.errorMessage = null;
    this._especialidadService.getEspecialidades().subscribe({
      next: (data: Especialidad[]) => {
        this.especialidades = data.map(e => ({
            id: (e as any).id_especialidad || e.id,
            descripcion: e.descripcion
        }));
        this.medicosConEspecialidadCount = { 40: 2, 10: 1, 30: 0 }; 
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar las especialidades. Verifique la conexión con el servidor.';
        this._utilService.openSnackBar(' Error al cargar especialidades.');
        console.error('Error de API al cargar especialidades', err);
      }
    });
  }

  eliminarEspecialidad(especialidad: Especialidad): void {
    if (confirm(`¿Está seguro que desea eliminar la especialidad: "${especialidad.descripcion}"?`)) {
      this._especialidadService.eliminarEspecialidad(especialidad.id).subscribe({
        next: () => {
          this._utilService.openSnackBar('Especialidad eliminada con éxito.');
          this.cargarEspecialidades();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) { 
             this._utilService.openSnackBar(`ERROR: No se puede eliminar "${especialidad.descripcion}". Está asociada a médicos.`);
          } else {
             this._utilService.openSnackBar('Error al intentar eliminar la especialidad.');
          }
          console.error(err);
        }
      });
    }
  }

}