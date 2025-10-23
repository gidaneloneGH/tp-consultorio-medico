// editar-turno-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnoService } from 'src/app/services/turnos/turno.service';

@Component({
  selector: 'app-editar-turno',
  templateUrl: './editar-turno.component.html',
})
export class EditarTurnoComponent {

  turnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private turnoService: TurnoService,
    public dialogRef: MatDialogRef<EditarTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.turnoForm = this.fb.group({
      fecha: [data.fecha, Validators.required],
      hora: [data.hora, Validators.required],
      nota: [data.nota, Validators.required]
    });
  }

  guardarCambios() {
    if (this.turnoForm.invalid) return;

    const datosActualizados = this.turnoForm.value;
    this.turnoService.actualizarTurno(this.data.id, datosActualizados).subscribe({
      next: (res) => {
        if (res.codigo === 200) {
          alert('Turno actualizado correctamente');
          this.dialogRef.close(datosActualizados); // Devolvemos los cambios al componente padre
        } else {
          alert('Error al actualizar turno');
        }
      },
      error: (err) => {
        console.error('Error al actualizar turno:', err);
        alert('Ocurrió un error al actualizar el turno');
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
