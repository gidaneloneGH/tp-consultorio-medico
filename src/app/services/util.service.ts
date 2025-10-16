import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private _snackBar = inject(MatSnackBar);

  constructor() { }

   openSnackBar(mensaje: string, duracion?: number) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: duracion || 5000
    });
  }
}
