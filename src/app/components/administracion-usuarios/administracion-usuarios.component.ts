import { Component, OnInit } from '@angular/core';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  rol: 'administrador' | 'medico' | 'operador' | 'paciente';
  dni: string;
  email: string;
  telefono: string;
  cobertura?: string; // Solo para pacientes, pero lo dejamos opcional
}

@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrls: ['./administracion-usuarios.component.css']
})
export class AdministracionUsuariosComponent implements OnInit {

  usuariosMock: Usuario[] = [
    { id: 1, nombre: 'Ana', apellido: 'Gómez', rol: 'administrador', dni: '10123456', email: 'ana.gomez@clinica.com', telefono: '1122334455' },
    { id: 2, nombre: 'Carlos', apellido: 'Pérez', rol: 'medico', dni: '15987654', email: 'carlos.perez@clinica.com', telefono: '1133445566' },
    { id: 3, nombre: 'Luisa', apellido: 'Díaz', rol: 'operador', dni: '20345678', email: 'luisa.diaz@clinica.com', telefono: '1144556677' },
    { id: 4, nombre: 'Roberto', apellido: 'Silva', rol: 'paciente', dni: '25456789', email: 'roberto.silva@mail.com', telefono: '1155667788', cobertura: 'OSDE 210' },
    { id: 5, nombre: 'Elena', apellido: 'Fernández', rol: 'medico', dni: '28678901', email: 'elena.f@clinica.com', telefono: '1166778899' },
    { id: 6, nombre: 'Pablo', apellido: 'López', rol: 'operador', dni: '35789012', email: 'pablo.lopez@clinica.com', telefono: '1177889900' },
  ];

  usuariosFiltrados: Usuario[] = [];

  filtroNombreApellido: string = '';
  filtroRol: string = ''; // Puede ser 'administrador', 'medico', 'operador', 'paciente' o '' para todos

  rolesDisponibles: string[] = ['Todos', 'administrador', 'medico', 'operador', 'paciente'];

  constructor() { }

  ngOnInit(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let tempUsuarios = this.usuariosMock;

    if (this.filtroNombreApellido) {
      const termino = this.filtroNombreApellido.toLowerCase().trim();
      tempUsuarios = tempUsuarios.filter(u =>
        u.nombre.toLowerCase().includes(termino) ||
        u.apellido.toLowerCase().includes(termino)
      );
    }

    if (this.filtroRol && this.filtroRol !== 'Todos') {
      tempUsuarios = tempUsuarios.filter(u => u.rol === this.filtroRol);
    }

    this.usuariosFiltrados = tempUsuarios;
  }
  
  editarUsuario(usuario: Usuario): void {
    console.log(`Simulando la edición del usuario con ID: ${usuario.id}`);
    alert(`Preparando para editar a ${usuario.nombre} ${usuario.apellido}.`);
  }
  
  agregarUsuario(): void {
    console.log('Simulando la navegación a la pantalla de creación de usuario.');
    alert('Abriendo formulario para agregar un nuevo usuario.');
  }

  capitalizarRol(rol: string): string {
    return rol.charAt(0).toUpperCase() + rol.slice(1);
  }
}