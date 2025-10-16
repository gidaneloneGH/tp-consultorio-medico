import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';

interface Cobertura {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-registro-dialog',
  templateUrl: './registro-dialog.component.html',
  styleUrls: ['./registro-dialog.component.css']
})
export class RegistroDialogComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  email: string = '';
  telefono: string = '';
  coberturaId: number | null = null;
  password: string = '';
  repetirPassword: string = '';

  coberturas: Cobertura[] = [];

  constructor(
    private dialogRef: MatDialogRef<RegistroDialogComponent>,
    private _utilService: UtilService
  ) {}

  ngOnInit() {
    this.coberturas = [
      { id: 1, nombre: 'OSDE' },
      { id: 2, nombre: 'Swiss Medical' },
      { id: 3, nombre: 'Galeno' },
      { id: 4, nombre: 'Medicus' }
    ];
  }

  onRegister() {
    if (!this.nombre || !this.apellido || !this.dni || !this.email || !this.telefono || !this.coberturaId || !this.password || !this.repetirPassword) {
      alert('Por favor completá todos los campos.');
      return;
    }

    if (this.password !== this.repetirPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Usuario registrado:', {
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      email: this.email,
      telefono: this.telefono,
      coberturaId: this.coberturaId
    });

    this.dialogRef.close({ success: true });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
