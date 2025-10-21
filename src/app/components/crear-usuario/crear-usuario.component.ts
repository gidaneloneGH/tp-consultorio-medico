import { Component, OnInit } from '@angular/core';

interface NuevoUsuario {
  rol: 'administrador' | 'medico' | 'operador' | '';
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  // Campos de credenciales iniciales (mockeados)
  password: string; 
  confirmarPassword: string;
}

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  rolesDisponibles: string[] = ['administrador', 'medico', 'operador'];

  nuevoUsuario: NuevoUsuario = {
    rol: '',
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    password: '',
    confirmarPassword: ''
  };

  constructor() { }

  ngOnInit(): void {

  }
  
  get formularioCompleto(): boolean {
    const usuario = this.nuevoUsuario;
    
    const camposLlenos = usuario.rol !== '' &&
                         usuario.nombre.trim().length > 0 &&
                         usuario.apellido.trim().length > 0 &&
                         usuario.dni.trim().length > 0 &&
                         usuario.email.trim().length > 0 &&
                         usuario.telefono.trim().length > 0;
                         
    return camposLlenos && this.passwordValida;
  }
  
  get passwordValida(): boolean {
      const { password, confirmarPassword } = this.nuevoUsuario;
      
      const minLength = 6;
      return password.length >= minLength && password === confirmarPassword;
  }
  
  crearUsuario(): void {
    if (!this.formularioCompleto) {
      alert('Debe completar todos los campos y verificar las contraseñas antes de crear el usuario.');
      return;
    }
    
    console.log('Usuario a crear:', this.nuevoUsuario);

    const mensaje = `✅ Usuario de tipo '${this.nuevoUsuario.rol.toUpperCase()}' creado con éxito para ${this.nuevoUsuario.nombre} ${this.nuevoUsuario.apellido}.`;
    
    alert(mensaje); 
    
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.nuevoUsuario = {
      rol: '',
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      telefono: '',
      password: '',
      confirmarPassword: ''
    };
  }

  cancelar(): void {
    alert('Cancelando creación y volviendo a la lista de administración.'); 
  }
}