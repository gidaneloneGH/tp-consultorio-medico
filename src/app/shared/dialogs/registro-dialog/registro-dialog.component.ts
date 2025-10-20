import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistroService } from 'src/app/services/usuario/registro.service';
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

  coberturas: Cobertura[] = [];
  formularioRegistro!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegistroDialogComponent>,
    private fb: FormBuilder,
    private _utilService: UtilService,
    private _registroService: RegistroService
  ) {}

  ngOnInit() {
    this.coberturas = [
      { id: 1, nombre: 'OSDE' },
      { id: 2, nombre: 'Swiss Medical' },
      { id: 3, nombre: 'Galeno' },
      { id: 4, nombre: 'Medicus' }
    ];

    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      id_cobertura: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator})
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repetirPassword = form.get('repetirPassword')?.value;
    if (password !== repetirPassword) {
      form.get('repetirPassword')?.setErrors({ mismatch: true });

    } else {
      form.get('repetirPassword')?.setErrors(null);
    }
    return null;
  }

  onRegister() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.get('repetirPassword')?.invalid ? 
      this._utilService.openSnackBar("Las contraseñas no coinciden") : 
      this._utilService.openSnackBar("Porfavor complete correctamente los campos")
      return;
    }

    console.log(this.formularioRegistro.get('fecha_nacimiento'));
    

    const usuario = {
      ...this.formularioRegistro.value,
      rol: 'paciente'
    };

    console.log("usuario",usuario);
    usuario.fecha_nacimiento = usuario.fecha_nacimiento.toISOString().split('T')[0];
    delete usuario.repetirPassword

    this._registroService.registrarUsuario(usuario).subscribe({
      next: (res) => {
        console.log(res);
        this._utilService.openSnackBar("Registro exitoso");
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this._utilService.openSnackBar("Error al registrar usuario");
        console.error(err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
