import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TurnoService } from 'src/app/services/turnos/turno.service';
import { UtilService } from 'src/app/services/util.service';
import { EditarTurnoComponent } from 'src/app/shared/dialogs/editar-turno/editar-turno.component';

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
  turnos: Turno[] = [];

  constructor(private _turnoService: TurnoService, private _utilService: UtilService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  private cargarTurnos(): void {
    const idPaciente = Number(localStorage.getItem('USERID'));

    this._turnoService.obtenerTurnosPaciente(idPaciente).subscribe({
      next: (res: any) => {
        if (res.codigo === 200) {
          this.turnos = res.payload.map((t: any) => ({
            id: t.id_turno,
            fecha: new Date(t.fecha),
            hora: t.hora,
            especialista: `${t.nombre_medico} ${t.apellido_medico}`,
            especialidad: t.especialidad,
            detallesVisible: false
          }));

          this.ordenarTurnos();
        }
      },
      error: (err: Error) => {
        console.error('Error al obtener turnos:', err);
      }
    });
  }

  private ordenarTurnos(): void {
    this.turnos.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  }

  toggleDetalles(turno: Turno): void {
    this.turnos.forEach(t => {
      if (t !== turno) t.detallesVisible = false;
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

  eliminarTurno(turno: Turno): void {
    if (!confirm(`¿Desea eliminar el turno con ${turno.especialista} el ${turno.fecha.toLocaleDateString()} a las ${turno.hora}?`)) {
      return;
    }

    this._turnoService.eliminarTurno(turno.id).subscribe({
      next: (res) => {
        this._utilService.openSnackBar('Turno eliminado correctamente');
        this.turnos = this.turnos.filter(t => t.id !== turno.id);
      },
      error: (err) => {
        console.error('Error al eliminar el turno:', err);
        this._utilService.openSnackBar('Ocurrió un error al eliminar el turno');
      }
    });
  }

  editarTurno(turno: Turno) {
    const dialogRef = this.dialog.open(EditarTurnoComponent, {
      width: '400px',
      data: { ...turno }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.turnos.findIndex(t => t.id === turno.id);
        if (index > -1) {
          this.turnos[index] = { ...this.turnos[index], ...result };
        }
      }
    });
  }
}
