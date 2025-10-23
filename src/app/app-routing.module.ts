import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PacienteRegistradoComponent } from './components/paciente-registrado/paciente-registrado.component';
import { NuevoTurnoComponent } from './components/nuevo-turno/nuevo-turno.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { AdministracionUsuariosComponent } from './components/administracion-usuarios/administracion-usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { InicioMedicoComponent } from './components/inicio-medico/inicio-medico.component';
import { TurnosProgramadosComponent } from './components/turnos-programados/turnos-programados.component';
import { GestionAgendaComponent } from './components/gestion-agenda/gestion-agenda.component';
import { InicioOperadorComponent } from './components/inicio-operador/inicio-operador.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { GestionCoberturasComponent } from './components/gestion-coberturas/gestion-coberturas.component';
import { GestionEspecialidadesComponent } from './components/gestion-especialidades/gestion-especialidades.component';
import { roleGuard } from './guards/role.guard';
import { RolUsuario } from './shared/enum/rol-usuario.enum';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'inicio-paciente', component: PacienteRegistradoComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.PACIENTE] } },
  { path: 'nuevo-turno', component: NuevoTurnoComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.PACIENTE] }},
  { path: 'mis-turnos', component: MisTurnosComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.PACIENTE] }},
  { path: 'datos-personales', component: DatosPersonalesComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.PACIENTE] }},
  { path: 'administracion-usuarios', component: AdministracionUsuariosComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.ADMIN] }},
  { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.ADMIN] }},
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.ADMIN] }},
  { path: 'inicio-medico', component: InicioMedicoComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.MEDICO] }},
  { path: 'turnos-programados', component: TurnosProgramadosComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.MEDICO] }},
  { path: 'gestion-agenda', component: GestionAgendaComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.MEDICO] }},
  { path: 'inicio-operador', component: InicioOperadorComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.OPERADOR] }},
  { path: 'inicio-admin', component: InicioAdminComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.ADMIN] }},
  { path: 'gestion-coberturas', component: GestionCoberturasComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.ADMIN] }},
  { path: 'gestion-especialidades', component: GestionEspecialidadesComponent, canActivate: [roleGuard], data: { roles: [RolUsuario.ADMIN] }},

  {path: '**', redirectTo: 'menu', pathMatch: 'full'}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
