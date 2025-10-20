import { Component } from '@angular/core';

@Component({
  selector: 'app-paciente-registrado',
  templateUrl: './paciente-registrado.component.html',
  styleUrls: ['./paciente-registrado.component.css']
})
export class PacienteRegistradoComponent {
  paciente: string = localStorage.getItem('USERNAME')!;

  constructor() {}

}
