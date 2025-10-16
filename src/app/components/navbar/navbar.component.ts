import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UtilService } from 'src/app/services/util.service';
import { LoginDialogComponent } from 'src/app/shared/dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private dialog: MatDialog,
    private _utilService: UtilService
  ){}

  abrirDialogLogin(){
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado.exito){
          this._utilService.openSnackBar("Inicio de sesión exitoso. Bienvenido!");
        }
      })
    }
}
