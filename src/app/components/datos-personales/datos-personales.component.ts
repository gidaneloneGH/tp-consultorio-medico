import { Component, OnInit } from '@angular/core';

interface DatosPersonales {
  dni: string;
  apellido: string;
  nombre: string;
  fecha_nacimiento: string;
  
  // Campos editables
  email: string;
  telefono: string;
  cobertura: string; 
  password?: string; // Usaremos un campo separado para la nueva contraseña
}

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  datosOriginales: DatosPersonales = {
    dni: '46.296.512',
    apellido: 'Danelone',
    nombre: 'Gianluca',
    fecha_nacimiento: '2004-12-03',
    email: 'gianludane.6@gmail.com',
    telefono: '342-508-0235',
    cobertura: 'IAPOS',
  };

  datosEditables: DatosPersonales = { ...this.datosOriginales };
  
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  coberturasDisponibles: string[] = ['OSDE', 'IAPOS', 'Swiss Medical'];

  constructor() { }

  ngOnInit(): void {
  }

  get hayCambios(): boolean {
    const emailCambiado = this.datosEditables.email !== this.datosOriginales.email;
    const telefonoCambiado = this.datosEditables.telefono !== this.datosOriginales.telefono;
    const coberturaCambiada = this.datosEditables.cobertura !== this.datosOriginales.cobertura;
    const passwordCambiado = this.nuevaPassword.length > 0;
    
    return emailCambiado || telefonoCambiado || coberturaCambiada || passwordCambiado;
  }
  
  get passwordValida(): boolean {
      const passwordCambiado = this.nuevaPassword.length > 0;
      if (passwordCambiado) {
          return this.nuevaPassword === this.confirmarPassword && this.nuevaPassword.length >= 6;
      }
      return true; 
  }
  
  guardarCambios(): void {
    if (!this.hayCambios) {
      alert('No hay cambios para guardar.');
      return;
    }
    
    if (!this.passwordValida) {
        alert('Error: Las contraseñas no coinciden o son demasiado cortas.');
        return;
    }
    
    this.datosOriginales = { ...this.datosEditables };
    
    this.nuevaPassword = '';
    this.confirmarPassword = '';

    this.mostrarPopupExito();
  }

  mostrarPopupExito(): void {
    alert('Cambios guardados con éxito'); 
  }
}