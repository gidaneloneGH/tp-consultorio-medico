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
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { A11yModule } from "@angular/cdk/a11y";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    LoginDialogComponent,
    RegistroDialogComponent
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
    A11yModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
