import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PacienteRegistradoComponent } from './components/paciente-registrado/paciente-registrado.component';
import { NuevoTurnoComponent } from './components/nuevo-turno/nuevo-turno.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'inicio-paciente', component: PacienteRegistradoComponent},
  { path: 'nuevo-turno', component: NuevoTurnoComponent},

  {path: '**', redirectTo: 'menu', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
