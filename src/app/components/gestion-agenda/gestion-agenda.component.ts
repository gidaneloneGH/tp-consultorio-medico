import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgendaService } from 'src/app/services/agenda/agenda.service'; // Importar el servicio
import { UtilService } from 'src/app/services/util.service'; 
import { RangoHorario, NuevoRangoInput, CrearAgendaPayload } from 'src/app/interfaces/agenda'; // Importar interfaces
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-agenda',
  templateUrl: './gestion-agenda.component.html',
  styleUrls: ['./gestion-agenda.component.css'],
  providers: [DatePipe]
})
export class GestionAgendaComponent implements OnInit {

  private _agendaService = inject(AgendaService);
  private _utilService = inject(UtilService);
  private datePipe = inject(DatePipe);


  private idMedico: number = Number(localStorage.getItem('USERID')!); 
  private idEspecialidadPorDefecto: number = 16;
  
  fechaSeleccionada: Date = new Date(); 
  minDate: Date = new Date();
  isLoading: boolean = false;
  
  rangosDelDia: RangoHorario[] = []; 
  
  rangosNuevos: NuevoRangoInput[] = []; 

  constructor() { }

  ngOnInit(): void {
    this.aplicarFiltroFecha(this.fechaSeleccionada);
  }

  private formatFecha(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  esHoy(fecha: Date): boolean {
    return this.formatFecha(fecha) === this.formatFecha(new Date());
  }

  onDateChange(event: any): void {
      this.aplicarFiltroFecha(event.value);
  }

  aplicarFiltroFecha(nuevaFecha: Date | null): void {
  if (!nuevaFecha) return;
  
  this.isLoading = true;
  this.fechaSeleccionada = nuevaFecha;
  const diaString = this.formatFecha(nuevaFecha);

  this.rangosNuevos = []; 

  this._agendaService.obtenerAgendaPorDia(this.idMedico).subscribe({
    next: (rangos) => {
      this.rangosDelDia = rangos.filter(rango => {
        const fechaRango = this.formatFecha(new Date(rango.fecha));
        return fechaRango === diaString;
      });

      console.log('Rangos filtrados:', this.rangosDelDia);
      this.isLoading = false;
    },
    error: (error) => {
      this._utilService.openSnackBar(`Error cargando agenda: ${error.message}`);
      this.rangosDelDia = [];
      this.isLoading = false;
    }
  });
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

    this.isLoading = true;
    const diaGuardar = this.formatFecha(this.fechaSeleccionada);
    let peticionesGuardado: Observable<number>[] = [];
    
    this.rangosNuevos.forEach(rango => {
        const payload: CrearAgendaPayload = {
            id_medico: this.idMedico,
            id_especialidad: this.idEspecialidadPorDefecto,
            fecha: diaGuardar,
            hora_entrada: `${rango.horaInicio}:00`,
            hora_salida: `${rango.horaFin}:00`,    
        };
        peticionesGuardado.push(this._agendaService.crearAgenda(payload));
    });
    
    const primerRango = this.rangosNuevos[0];
    const payload: CrearAgendaPayload = {
        id_medico: this.idMedico,
        id_especialidad: this.idEspecialidadPorDefecto,
        fecha: diaGuardar,
        hora_entrada: `${primerRango.horaInicio}:00`, 
        hora_salida: `${primerRango.horaFin}:00`,     
    };

    this._agendaService.crearAgenda(payload).subscribe({
        next: () => {
            this._utilService.openSnackBar(`Rango guardado con éxito.`);
            this.aplicarFiltroFecha(this.fechaSeleccionada);
        },
        error: (error) => {
            this.isLoading = false;
            this._utilService.openSnackBar(`Falló el guardado: ${error.message}`);
        }
    });
  }
  
}