import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuComponent } from './components/menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginDialogComponent } from './shared/dialogs/login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { RegistroDialogComponent } from './shared/dialogs/registro-dialog/registro-dialog.component';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { A11yModule } from "@angular/cdk/a11y";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import { AuthInterceptor } from './auth.interceptor';
import { EditarTurnoComponent } from './shared/dialogs/editar-turno/editar-turno.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    LoginDialogComponent,
    RegistroDialogComponent,
    PacienteRegistradoComponent,
    NuevoTurnoComponent,
    MisTurnosComponent,
    DatosPersonalesComponent,
    AdministracionUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    InicioMedicoComponent,
    TurnosProgramadosComponent,
    GestionAgendaComponent,
    InicioOperadorComponent,
    InicioAdminComponent,
    GestionCoberturasComponent,
    GestionEspecialidadesComponent,
    EditarTurnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    CdkVirtualScrollableElement,
    A11yModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
