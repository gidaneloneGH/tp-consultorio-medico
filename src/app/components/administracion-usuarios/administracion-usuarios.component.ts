import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario'; // Importamos la interfaz Usuario
import { UtilService } from 'src/app/services/util.service'; // Servicio de Utilidades
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrls: ['./administracion-usuarios.component.css']
})
export class AdministracionUsuariosComponent implements OnInit {

  private _usuarioService = inject(UsuarioService);
  private _utilService = inject(UtilService);

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  isLoading: boolean = true;
  error: string | null = null;

  filtroNombreApellido: string = '';
  filtroRol: string = ''; 

  rolesDisponibles: string[] = ['Todos', 'admin', 'medico', 'operador', 'paciente'];

  constructor() { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.isLoading = true;
    this.error = null;

    this._usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        console.log("data", data);
        
        this.usuarios = data;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const mensajeError = err.error?.mensaje || 'Error al cargar los usuarios. Intente más tarde.';
        this.error = mensajeError;
        this._utilService.openSnackBar(`${mensajeError}`);
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  aplicarFiltros(): void {
  const termino = (this.filtroNombreApellido || '').toLowerCase().trim();
  const rolFiltro = (this.filtroRol || '').toLowerCase();

  this.usuariosFiltrados = this.usuarios.filter(u => {
    const nombre = (u.nombre || '').toLowerCase();
    const apellido = (u.apellido || '').toLowerCase();
    const correo = (u.email || '').toLowerCase();
    const rol = (u.rol || '').toLowerCase();

    const coincideNombre = termino ? (nombre.includes(termino) || apellido.includes(termino) || correo.includes(termino)) : true;

    const coincideRol = rolFiltro ? rol === rolFiltro : true;

    return coincideNombre && coincideRol;
  });
}



  capitalizarRol(rol: string): string {
    return rol.charAt(0).toUpperCase() + rol.slice(1);
  }
}
