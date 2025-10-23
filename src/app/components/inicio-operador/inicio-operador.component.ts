// inicio-operador.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, of, switchMap, map } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { TurnoService } from 'src/app/services/turnos/turno.service';
import { respuestaApi } from 'src/app/services/coberturas/cobertura.service';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Usuario } from 'src/app/interfaces/usuario';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';

interface AgendaMedicoDia {
  medico: string;
  especialidad: string;
  horario: string;
  id_medico: number;
  fecha: string;
}

@Component({
  selector: 'app-inicio-operador',
  templateUrl: './inicio-operador.component.html',
  styleUrls: ['./inicio-operador.component.css'],
})
export class InicioOperadorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private turnoService = inject(TurnoService);
  private dialog = inject(MatDialog);
  private agendaService = inject(AgendaService);
  private especialidadService = inject(EspecialidadService);

  filtroFechaForm!: FormGroup;
  dataSource = new MatTableDataSource<AgendaMedicoDia>([]);
  displayedColumns = ['medico', 'especialidad', 'horario', 'acciones'];

  ngOnInit(): void {
    const hoy = new Date();
    this.filtroFechaForm = this.fb.group({ fecha: [hoy] });
    this.cargarAgendasDelDia();
  }

  cambiarFecha(): void {
    this.cargarAgendasDelDia();
  }

  cargarAgendasDelDia(): void {
    const fechaSeleccionada: Date = this.filtroFechaForm.value.fecha;
    const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];

    this.dataSource.data = [];

    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        const medicos = usuarios.filter((u) => u.rol === 'medico');

        if (!medicos.length) return;

        const requests = medicos.map((medico) =>
          this.agendaService.obtenerAgendaPorDia(medico.id!).pipe(
            switchMap((resAgenda: any) => {
              console.log(resAgenda);
              
              const agendasDelDia = resAgenda.filter(
                (a: any) =>
                  a.fecha &&
                  new Date(a.fecha).toISOString().split('T')[0] === fechaFormateada
              );

              if (!agendasDelDia.length) return of([]);

              return this.especialidadService.getEspecialidadesPorMedico(medico.id!).pipe(
                map((resEsp: respuestaApi<Especialidad[]>) => {
                  console.log(resEsp);
                  
                  const especialidadMedico =
                    resEsp.payload.length > 0
                      ? resEsp.payload.map((e) => e.descripcion).join(', ')
                      : '—';

                  return agendasDelDia.map((agenda: any) => ({
                    medico: `${medico.apellido}, ${medico.nombre}`,
                    especialidad: especialidadMedico,
                    horario: `${agenda.hora_entrada} - ${agenda.hora_salida}`,
                    id_medico: medico.id,
                    fecha: fechaFormateada,
                  }));
                })
              );
            })
          )
        );

        forkJoin(requests).subscribe({
          next: (resultados) => {
            const agendasPlanificadas = resultados.flat();
            this.dataSource.data = agendasPlanificadas;
          },
          error: (err) => {
            console.error('Error al obtener agendas', err);
            this.dataSource.data = [];
          },
        });
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      },
    });
  }

  verTurnos(medico: AgendaMedicoDia): void {
    // this.turnoService.obtenerTurnosMedico(medico.id_medico, medico.fecha).subscribe({
    //   next: (res: respuestaApi<Turno[]>) => {
    //     this.dialog.open(VerTurnosDialogComponent, {
    //       width: '800px',
    //       data: { medico: medico.medico, fecha: medico.fecha, turnos: res.payload || [] },
    //     });
    //   },
    //   error: (err) => console.error('Error al cargar turnos:', err),
    // });
  }

  editarAgenda(medico: AgendaMedicoDia): void {
    // this.dialog
    //   .open(EditarAgendaComponent, {
    //     width: '900px',
    //     maxHeight: '90vh',
    //     panelClass: 'editar-agenda-dialog-panel',
    //     autoFocus: false,
    //     data: { id_medico: medico.id_medico, nombre_medico: medico.medico, fecha: medico.fecha },
    //   })
    //   .afterClosed()
    //   .subscribe((actualizado) => {
    //     if (actualizado) this.cargarAgendasDelDia();
    //   });
  }
}
