// editar-usuario-reactive.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { CoberturaService } from 'src/app/services/coberturas/cobertura.service';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Cobertura } from 'src/app/interfaces/cobertura';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario-reactive',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [DatePipe]
})
export class EditarUsuarioComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _usuarioService = inject(UsuarioService);
  private _coberturaService = inject(CoberturaService);
  private _utilService = inject(UtilService);
  private datePipe = inject(DatePipe);

  userId: string | null = null;
  isLoading = true;
  error: string | null = null;

  rolesDisponibles = ['administrador', 'medico', 'operador', 'paciente'];
  coberturasDisponibles: Cobertura[] = [];

  usuarioForm!: FormGroup;
  usuarioOriginal!: Usuario;

  contraseñaUsuario: string = "";

  constructor(){
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fecha_nacimiento: [''],
      rol: ['', Validators.required],
      id_cobertura: [''],
      nuevaPassword: [''],
      confirmarPassword: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (!this.userId) {
        this._utilService.openSnackBar('ID de usuario no proporcionado.');
        this.router.navigate(['/administracion-usuarios']);
        return;
      }
      this.cargarCoberturas();
      this.cargarUsuario(this.userId);
    });
  }

  cargarCoberturas() {
    this._coberturaService.getCoberturas().subscribe((data: Cobertura[]) => {
      this.coberturasDisponibles = data;
    });
  }

  cargarUsuario(id: string) {
    this.isLoading = true;
    this._usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario: Usuario) => {
        this.usuarioOriginal = usuario;
        this.isLoading = false;     
        console.warn(usuario);
           

        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          dni: usuario.dni,
          email: usuario.email,
          telefono: usuario.telefono,
          fecha_nacimiento: usuario.fecha_nacimiento?.split('T')[0],
          rol: usuario.rol,
          id_cobertura: usuario.id_cobertura
        })

        this.contraseñaUsuario = usuario.password!;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = err.error?.mensaje || 'Error al cargar usuario';
        this._utilService.openSnackBar(`❌ ${this.error}`);
      }
    });
  }


  get passwordValida(): boolean {
    const pass = this.usuarioForm.get('nuevaPassword')?.value;
    const confirm = this.usuarioForm.get('confirmarPassword')?.value;
    if (!pass && !confirm) return true;
    return pass === confirm && pass.length >= 6;
  }

  get hayCambios(): boolean {
    if (!this.usuarioForm) return false;

    const formValue = this.usuarioForm.getRawValue();
    const original = this.usuarioOriginal;

    return (
      formValue.rol !== original.rol ||
      formValue.nombre !== original.nombre ||
      formValue.apellido !== original.apellido ||
      formValue.email !== original.email ||
      formValue.telefono !== original.telefono ||
      formValue.fecha_nacimiento !== this.datePipe.transform(original.fecha_nacimiento, 'yyyy-MM-dd') ||
      formValue.id_cobertura !== original.id_cobertura ||
      formValue.nuevaPassword.length > 0
    );
  }

  guardarCambios() {
    if (!this.hayCambios) {
      this._utilService.openSnackBar('No hay cambios para guardar.');
      return;
    }

    if (!this.passwordValida) {
      this._utilService.openSnackBar('Las contraseñas no coinciden o son demasiado cortas (mínimo 6).');
      return;
    }

    const formValue = this.usuarioForm.getRawValue();
    const payload: Partial<Usuario> = {
      dni: formValue.dni,
      rol: formValue.rol,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      email: formValue.email,
      telefono: formValue.telefono,
      fecha_nacimiento: formValue.fecha_nacimiento,
      id_cobertura: formValue.id_cobertura,
    };

    if (formValue.nuevaPassword) {
      payload.password = formValue.nuevaPassword;
    }else{
      payload.password = this.contraseñaUsuario;
    }

    this._usuarioService.actualizarUsuario(this.userId!, payload).subscribe({
      next: () => {
        this._utilService.openSnackBar('Usuario actualizado con éxito.');
        this.usuarioOriginal = { ...this.usuarioOriginal, ...payload };
        this.usuarioForm.get('nuevaPassword')?.reset();
        this.usuarioForm.get('confirmarPassword')?.reset();
      },
      error: (err: HttpErrorResponse) => {
        const mensajeError = err.error?.mensaje || 'Error desconocido al actualizar usuario';
        this._utilService.openSnackBar(`${mensajeError}`);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/administracion-usuarios']);
  }
}
