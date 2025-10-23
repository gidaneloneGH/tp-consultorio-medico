import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service'; 
import { TurnoService } from 'src/app/services/turnos/turno.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {

  idCobertura: number = 0;
  idPaciente: number = 0;
  especialidades: Especialidad[] = [];
  profesionalesFiltrados: any[] = [];
  agendaCompleta: any[] = [];
  horasDisponibles: { hora: string, idAgenda: number }[] = [];

  especialidadSeleccionada: any = null;
  profesionalSeleccionado: any = null;
  fechaSeleccionada: Date | null = null;
  horaSeleccionada: any = null;
  notaTurno: string = '';

  constructor(
    private router: Router,
    private turnoService: TurnoService,
    private utilService: UtilService,
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private agendaService: AgendaService
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(localStorage.getItem('USERID'));

    this.cargarEspecialidades();
    
    this.usuarioService.obtenerUsuarioPorId(localStorage.getItem('USERID')!).subscribe((data: Usuario) => {
      if (data) {
        this.idCobertura = data.id_cobertura;
      }
    });
  }

  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe({
      next: (res: Especialidad[]) => {     
        
        this.especialidades = res;
        console.log(this.especialidades);
      },
      error: (err: any) => console.error('Error al cargar especialidades:', err)
    });
  }

  seleccionarEspecialidad(especialidad: Especialidad): void {
    this.especialidadSeleccionada = especialidad;
    this.especialidadService.getMedicosPorEspecialidad(especialidad.id).subscribe({
      next: (res: any) => {
        if (res.codigo === 200) {
          this.profesionalesFiltrados = res.payload;
        }
      },
      error: (err: any) => console.error('Error al cargar profesionales:', err)
    });
  }

  seleccionarProfesional(profesional: any): void {
    this.profesionalSeleccionado = profesional;

    this.agendaService.obtenerAgendaPorDia(profesional.id_medico).subscribe({
      next: (res: any) => {
        console.log(res);
        
          this.agendaCompleta = res;
      },
      error: (err: Error) => console.error('Error al obtener agenda del médico:', err)
    });
  }

  seleccionarFecha(fecha: Date): void {
    this.fechaSeleccionada = fecha;

    if (!this.agendaCompleta.length) return;

    const fechaStr = fecha.toISOString().split('T')[0];

    const agendaFiltrada = this.agendaCompleta.filter((a) => {
      const fechaAgenda = new Date(a.fecha).toISOString().split('T')[0];
      return fechaAgenda === fechaStr;
    });

    this.generarHorasDisponibles(agendaFiltrada);
  }

  generarHorasDisponibles(agendaFiltrada: any[]): void {
    this.horasDisponibles = [];

    agendaFiltrada.forEach((agenda) => {
      let [horaInicio, minutoInicio] = agenda.hora_entrada.split(':').map(Number);
      const [horaFin, minutoFin] = agenda.hora_salida.split(':').map(Number);

      while (horaInicio < horaFin || (horaInicio === horaFin && minutoInicio < minutoFin)) {
        const horaStr = `${horaInicio.toString().padStart(2, '0')}:${minutoInicio
          .toString()
          .padStart(2, '0')}`;

        this.horasDisponibles.push({ hora: horaStr, idAgenda: agenda.id });

        minutoInicio += 30;
        if (minutoInicio >= 60) {
          horaInicio++;
          minutoInicio = 0;
        }
      }
    });
  }

  seleccionarHora(hora: any): void {
    this.horaSeleccionada = hora;
  }

  confirmarTurno(): void {
    if (!this.formularioCompleto) return;

    const turno = {
      nota: this.notaTurno,
      id_agenda: this.horaSeleccionada.idAgenda, // 👈 ID real de agenda
      fecha: this.fechaSeleccionada?.toISOString().split('T')[0],
      hora: this.horaSeleccionada.hora,
      id_paciente: this.idPaciente,
      id_cobertura: this.idCobertura
    };

    console.log('Turno a enviar:', turno);

    this.turnoService.asignarTurno(turno).subscribe({
      next: (res: any) => {
        if (res.codigo === 200) {
          alert('Turno asignado correctamente');
          this.router.navigate(['/inicio-paciente']);
        } else {
          alert('Error al asignar turno: ' + res.message);
        }
      },
      error: (err: any) => {
        console.error('Error en la petición:', err);
        alert('Ocurrió un error al asignar el turno');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/inicio-paciente']);
  }

  // ✅ Validaciones del paso a paso
  get formularioCompleto(): boolean {
    return (
      !!this.especialidadSeleccionada &&
      !!this.profesionalSeleccionado &&
      !!this.fechaSeleccionada &&
      !!this.horaSeleccionada &&
      this.notaTurno.trim().length > 0
    );
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
}
