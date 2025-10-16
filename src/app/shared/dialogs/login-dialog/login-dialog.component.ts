import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  username: string = '';
  password: string = '';

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _utilService: UtilService
  ) {}

  onLogin() {
    if (this.username && this.password) {
      console.log('Usuario:', this.username);
      console.log('Contraseña:', this.password);
      this.dialogRef.close({ exito: true });
    } else {
      this._utilService.openSnackBar("Por favor complete todos los datos", 8000)
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
