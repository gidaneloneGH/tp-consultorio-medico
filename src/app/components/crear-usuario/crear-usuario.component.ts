import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilService } from 'src/app/services/util.service'; 
import { RegistroService } from 'src/app/services/usuario/registro.service';
import { Usuario } from 'src/app/interfaces/usuario';

// Función de validación cruzada para verificar que las contraseñas coincidan
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmarPassword');

  if (!password || !confirmarPassword) {
    return null;
  }

  // Marcar como error si están llenos pero no coinciden
  return password.value === confirmarPassword.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  rolesDisponibles: string[] = ['administrador', 'medico', 'operador'];
  usuarioForm: FormGroup;
  
  private fb = inject(FormBuilder);
  private _registroService = inject(RegistroService);
  private _utilService = inject(UtilService);

  constructor() {
    this.usuarioForm = this.fb.group({
      rol: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(7)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', Validators.required], // 💡 NUEVO CAMPO AGREGADO
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9 -]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {

  }
  
  crearUsuario(): void {
    if (this.usuarioForm.invalid) {
      this._utilService.openSnackBar('Debe completar y corregir todos los campos obligatorios.');
      this.usuarioForm.markAllAsTouched();
      return;
    }
    
    const { confirmarPassword, ...usuarioData } = this.usuarioForm.value;

    console.log(usuarioData);
    
    
    const fechaISO = (usuarioData.fechaNacimiento as Date).toISOString().split('T')[0];

    const nuevoUsuario: Usuario = { 
      ...usuarioData, 
      fecha_nacimiento: fechaISO // Sobreescribimos con el formato de cadena
    };

    console.log(nuevoUsuario);
    

    this._registroService.registrarUsuario(nuevoUsuario).subscribe({
      next: (response) => {
        const mensaje = ` Usuario de tipo '${nuevoUsuario.rol.toUpperCase()}' creado con éxito.`;
        this._utilService.openSnackBar(mensaje);
        this.resetFormulario();
      },
      error: (err: HttpErrorResponse) => {
        let mensajeError = 'Error desconocido al crear el usuario.';
        
        if (err.status === 409 && err.error?.mensaje?.includes('duplicado')) {
          mensajeError = 'Error: El DNI o Correo Electrónico ya están registrados.';
        } else if (err.error?.mensaje) {
          mensajeError = `Error: ${err.error.mensaje}`;
        }
        
        this._utilService.openSnackBar(mensajeError);
        console.error('Error de registro:', err);
      }
    });
  }

  resetFormulario(): void {
    this.usuarioForm.reset({
      rol: '',
      dni: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      email: '',
      telefono: '',
      password: '',
      confirmarPassword: ''
    });
    this.usuarioForm.markAsPristine();
    this.usuarioForm.markAsUntouched();
  }

  cancelar(): void {
    this._utilService.openSnackBar('Cancelando y volviendo a la lista de administración.');
    this.resetFormulario(); 
  }
}