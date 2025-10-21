import { Component, OnInit } from '@angular/core';
import { CoberturaService } from 'src/app/services/coberturas/cobertura.service';

@Component({
  selector: 'app-paciente-registrado',
  templateUrl: './paciente-registrado.component.html',
  styleUrls: ['./paciente-registrado.component.css']
})
export class PacienteRegistradoComponent{
  paciente: string = localStorage.getItem('USERNAME')!;

  constructor(private _coberturaService: CoberturaService) {}

}
