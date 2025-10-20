import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RespuestaApiLogin, UsuarioLogin } from 'src/app/interfaces/response';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/services/usuario/login.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit{
  formularioLogin!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _utilService: UtilService,
    private _loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if(this.formularioLogin.invalid){
      this._utilService.openSnackBar("Complete correctamente los campos");
      return;
    }

    console.log(this.formularioLogin);
    

    this._loginService.login(
      String(this.formularioLogin.get('usuario')?.value),
      this.formularioLogin.get('password')?.value
    ).subscribe
    (
      (res: RespuestaApiLogin) => {
        console.log(res);
        
        if(res.codigo === 200 && res.jwt){

          this._utilService.openSnackBar("Bienvenido");
          localStorage.setItem('TOKEN', res.jwt);
          localStorage.setItem('USERID', res.payload[0].id)
          localStorage.setItem('USERNAME', res.payload[0].nombre)
          localStorage.setItem('USERROLE', res.payload[0].rol)

          this.dialogRef.close();
          this.router.navigate(['/inicio-paciente']);
        }else{
          this._utilService.openSnackBar(res.mensaje);
        }

      },
      (err) => {
        this._utilService.openSnackBar("Error al inciar sesión");
        console.error(err);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
