import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Nuevas importaciones para Reactive Forms
import { Cobertura } from 'src/app/interfaces/cobertura';
import { CoberturaService } from 'src/app/services/coberturas/cobertura.service';

@Component({
  selector: 'app-gestion-coberturas',
  templateUrl: './gestion-coberturas.component.html',
  styleUrls: ['./gestion-coberturas.component.css']
})
export class GestionCoberturasComponent implements OnInit {

  coberturas: Cobertura[] = [];
  usuariosConCobertura: { [key: number]: number[] } = {
    4: [101, 105], 
  };

  altaForm: FormGroup; 
  edicionControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  coberturaEditada: Cobertura | null = null;
  errorMessage: string = '';

  constructor(
    private coberturasService: CoberturaService,
    private fb: FormBuilder // Inyectar FormBuilder
  ) {
    this.altaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.cargarCoberturas();
  }

  cargarCoberturas(): void {
    this.coberturasService.getTodasCoberturas().subscribe({
      next: (data: Cobertura[]) => {
        this.coberturas = data;
        this.errorMessage = '';
      },
      error: (err: Error) => {
        this.errorMessage = 'Error al cargar las coberturas.';
        console.error('Error de api:', err);
      }
    });
  }

  crearCobertura(): void {
    if (this.altaForm.invalid) {
      this.altaForm.markAllAsTouched();
      return;
    }
    
    const nuevoNombre: string = this.altaForm.value.nombre;
    
    this.coberturasService.crearCobertura(nuevoNombre.trim()).subscribe({
      next: () => {
        alert('Cobertura creada con éxito.');
        this.altaForm.reset;
        this.cargarCoberturas(); 
      },
      error: (err: Error) => {
        alert('Error al crear la cobertura: ' + err.message);
        console.error(err);
      }
    });
  }

  iniciarEdicion(cobertura: Cobertura): void {
    this.coberturaEditada = { ...cobertura }; 

    this.edicionControl.setValue(cobertura.nombre);
    this.edicionControl.markAsPristine();
    this.edicionControl.markAsUntouched();
  }

  guardarEdicion(): void {
    // if (this.edicionControl.invalid || !this.coberturaEditada) {
    //   this.edicionControl.markAsTouched();
    //   return;
    // }
    
    // const coberturaActualizada: Cobertura = {
    //     ...this.coberturaEditada,
    //     nombre: this.edicionControl.value.trim()
    // };
    
    // this.coberturasService.modificarCobertura(coberturaActualizada).subscribe({
    //   next: () => {
    //     alert('Cobertura modificada con éxito.');
    //     this.coberturaEditada = null;
    //     this.cargarCoberturas();
    //   },
    //   error: (err: Error) => {
    //     alert('Error al modificar la cobertura.');
    //     console.error(err);
    //   }
    // });
    console.log("cobertura editada");
    
  }

  eliminarCobertura(coberturaId: number, coberturaNombre: string): void {
      
    // if (!confirm(`¿Está seguro que desea eliminar la cobertura: "${coberturaNombre}"?`)) return;

    // this.coberturasService.eliminarCobertura(coberturaId).subscribe({
    //   next: () => {
    //     alert('Cobertura eliminada con éxito.');
    //     this.cargarCoberturas();
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     // Asume 409 Conflict si está asociado
    //     if (err.status === 409) { 
    //        alert(`ERROR: No se puede eliminar "${coberturaNombre}". La cobertura está asociada a uno o más usuarios.`);
    //     } else {
    //        alert('Error al intentar eliminar la cobertura. Código: ' + err.status);
    //     }
    //     console.error(err);
    //   }
    // });
  }

  cancelarEdicion(): void {
    this.coberturaEditada = null;
    this.edicionControl.reset();
  }
}
