import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { LoginDialogComponent } from 'src/app/shared/dialogs/login-dialog/login-dialog.component';
import { RegistroDialogComponent } from 'src/app/shared/dialogs/registro-dialog/registro-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  usuarioEstaRegistrado: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _utilService: UtilService
  ){

  }

  abrirDialogLogin(){
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado.exito){
        this._utilService.openSnackBar("Inicio de sesión exitoso. Bienvenido!");
        this.usuarioEstaRegistrado = true;
      }
    })
  }

  abrirDialogRegistro() {
    const dialogRef = this.dialog.open(RegistroDialogComponent, {
      width: '450px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this._utilService.openSnackBar("Registro exitoso. Ya puede iniciar sesión");
        this.usuarioEstaRegistrado = true;
      }
    });
  }

}
