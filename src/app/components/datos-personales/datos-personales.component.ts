import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { DatePipe } from '@angular/common';
import { Cobertura } from 'src/app/interfaces/cobertura';
import { CoberturaService } from 'src/app/services/coberturas/cobertura.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers: [DatePipe]
})
export class DatosPersonalesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private utilService = inject(UtilService);
  private datePipe = inject(DatePipe);
  private coberturaService = inject(CoberturaService);

  datosForm!: FormGroup;
  usuarioOriginal!: Usuario;
  coberturasDisponibles: Cobertura[] = [];
  isLoading = true;
  idUsuario = localStorage.getItem('USERID');

  ngOnInit(): void {
    this.datosForm = this.fb.group({
      dni: [{ value: '', disabled: true }],
      apellido: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      fecha_nacimiento: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      cobertura: [''],
      nuevaPassword: [''],
      confirmarPassword: ['']
    });

    this.cargarDatosPaciente();
    this.cargarCoberturas();
  }

  cargarCoberturas(){
    this.coberturaService.getCoberturas().subscribe((res: Cobertura[]) =>{
      this.coberturasDisponibles = res;
    })
  }

  cargarDatosPaciente() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario!).subscribe({
      next: (usuario: Usuario) => {
        this.usuarioOriginal = usuario;

        this.datosForm.patchValue({
          dni: usuario.dni,
          apellido: usuario.apellido,
          nombre: usuario.nombre,
          fecha_nacimiento: this.datePipe.transform(usuario.fecha_nacimiento, 'yyyy-MM-dd'),
          email: usuario.email,
          telefono: usuario.telefono,
          cobertura: usuario.id_cobertura,
        });

        this.isLoading = false;
      },
      error: () => {
        this.utilService.openSnackBar('Error al cargar datos.');
        this.isLoading = false;
      }
    });
  }

  get hayCambios(): boolean {
    if (!this.datosForm || !this.usuarioOriginal) return false;
    const formValue = this.datosForm.getRawValue();

    return (
      formValue.rol !== this.usuarioOriginal.rol ||
      formValue.nombre !== this.usuarioOriginal.nombre ||
      formValue.apellido !== this.usuarioOriginal.apellido ||
      formValue.email !== this.usuarioOriginal.email ||
      formValue.telefono !== this.usuarioOriginal.telefono ||
      formValue.fecha_nacimiento !== this.datePipe.transform(this.usuarioOriginal.fecha_nacimiento, 'yyyy-MM-dd') ||
      formValue.id_cobertura !== this.usuarioOriginal.id_cobertura ||
      formValue.nuevaPassword.length > 0
    );
  }

  get passwordValida(): boolean {
    const pass = this.datosForm.get('nuevaPassword')?.value;
    const confirm = this.datosForm.get('confirmarPassword')?.value;

    if (!pass && !confirm) return true;
    return pass === confirm && pass.length >= 6;
  }

  guardarCambios(): void {
  if (!this.hayCambios) {
    this.utilService.openSnackBar('No hay cambios para guardar.');
    return;
  }

  if (!this.passwordValida) {
    this.utilService.openSnackBar('Las contraseñas no coinciden o son muy cortas.');
    return;
  }

  // Solo tomamos los campos editables
  const payload: Partial<Usuario> = {
    dni: this.datosForm.get('dni')?.value,
    rol: localStorage.getItem('USERROLE')!,
    nombre: this.datosForm.get('nombre')?.value,
    apellido: this.datosForm.get('apellido')?.value,
    email: this.datosForm.get('email')?.value,
    telefono: this.datosForm.get('telefono')?.value,
    fecha_nacimiento: this.datosForm.get('fecha_nacimiento')?.value,
    id_cobertura: this.datosForm.get('cobertura')?.value
  };

  // const payload: Partial<Usuario> = {
  //     dni: formValue.dni,
  //     rol: formValue.rol,
  //     nombre: formValue.nombre,
  //     apellido: formValue.apellido,
  //     email: formValue.email,
  //     telefono: formValue.telefono,
  //     fecha_nacimiento: formValue.fecha_nacimiento,
  //     id_cobertura: formValue.id_cobertura,
  //   };

  // Solo si cambió la contraseña
  const nuevaPass = this.datosForm.get('nuevaPassword')?.value;
  if (nuevaPass) {
    payload.password = nuevaPass;
  }

  this.usuarioService.actualizarUsuario(this.idUsuario!, payload).subscribe({
    next: () => {
      this.utilService.openSnackBar('Datos actualizados con éxito.');

      // Actualizamos solo los campos editables del usuarioOriginal
      this.usuarioOriginal = { ...this.usuarioOriginal, ...payload };

      // Limpiamos los campos de contraseña
      this.datosForm.get('nuevaPassword')?.reset();
      this.datosForm.get('confirmarPassword')?.reset();
    },
    error: () => {
      this.utilService.openSnackBar('Error al actualizar los datos.');
    }
  });
}

}
