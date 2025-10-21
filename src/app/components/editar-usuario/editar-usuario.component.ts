import { Component, OnInit } from '@angular/core';

interface Usuario {
  id: number;
  rol: 'administrador' | 'medico' | 'operador' | 'paciente';
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  cobertura?: string;
  fecha_nacimiento?: string;
  password?: string;
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  rolesDisponibles: string[] = ['administrador', 'medico', 'operador', 'paciente'];
  coberturasDisponibles: string[] = ['OSDE 210', 'Swiss Medical 40', 'Particular', 'Ninguna'];

  usuarioOriginal: Usuario = {
    id: 501,
    rol: 'medico',
    nombre: 'Juan',
    apellido: 'Sánchez',
    dni: '22889977',
    email: 'juan.sanchez@salud.com',
    telefono: '11-9876-5432',
  };

  usuarioEditado: Usuario = { ...this.usuarioOriginal };
  
  nuevaPassword: string = '';
  confirmarPassword: string = '';

  constructor() { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    this.usuarioEditado = { ...this.usuarioOriginal };
  }

  get hayCambios(): boolean {
    const original = this.usuarioOriginal;
    const editado = this.usuarioEditado;

    const datosCambiados = original.rol !== editado.rol ||
                           original.nombre !== editado.nombre ||
                           original.apellido !== editado.apellido ||
                           original.dni !== editado.dni ||
                           original.email !== editado.email ||
                           original.telefono !== editado.telefono ||
                           original.cobertura !== editado.cobertura ||
                           original.fecha_nacimiento !== editado.fecha_nacimiento;
                           
    return datosCambiados || this.nuevaPassword.length > 0;
  }

  get passwordValida(): boolean {
      const minLength = 6;
      const passwordCambiado = this.nuevaPassword.length > 0;
      
      if (passwordCambiado) {
          return this.nuevaPassword.length >= minLength && this.nuevaPassword === this.confirmarPassword;
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

    console.log('Usuario a actualizar:', this.usuarioEditado);

      if (this.nuevaPassword) {
      this.usuarioEditado.password = this.nuevaPassword;
    }
    
    this.usuarioOriginal = { ...this.usuarioEditado };
    
    this.nuevaPassword = '';
    this.confirmarPassword = '';

    this.mostrarPopupExito();
  }

  mostrarPopupExito(): void {
    alert(` Cambios guardados con éxito para ${this.usuarioOriginal.nombre} ${this.usuarioOriginal.apellido}.`); 
  }

  cancelar(): void {
    alert('Cancelando edición y volviendo a la lista de administración.'); 
  }

  capitalizarRol(rol: string): string {
    return rol.charAt(0).toUpperCase() + rol.slice(1);
  }
}