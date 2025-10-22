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

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'inicio-paciente', component: PacienteRegistradoComponent},
  { path: 'nuevo-turno', component: NuevoTurnoComponent},
  { path: 'mis-turnos', component: MisTurnosComponent},
  { path: 'datos-personales', component: DatosPersonalesComponent},
  { path: 'administracion-usuarios', component: AdministracionUsuariosComponent},
  { path: 'crear-usuario', component: CrearUsuarioComponent},
  { path: 'editar-usuario', component: EditarUsuarioComponent},
  { path: 'inicio-medico', component: InicioMedicoComponent},
  { path: 'turnos-programados', component: TurnosProgramadosComponent},
  { path: 'gestion-agenda', component: GestionAgendaComponent},
  { path: 'inicio-operador', component: InicioOperadorComponent},
  { path: 'inicio-admin', component: InicioAdminComponent},
  { path: 'gestion-coberturas', component: GestionCoberturasComponent},
  { path: 'gestion-especialidades', component: GestionEspecialidadesComponent},

  {path: '**', redirectTo: 'menu', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
