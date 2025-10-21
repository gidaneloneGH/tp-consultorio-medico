import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-medico',
  templateUrl: './inicio-medico.component.html',
  styleUrls: ['./inicio-medico.component.css']
})
export class InicioMedicoComponent implements OnInit {
  
  medico: string = 'Dr/a. González';
  
  constructor() { }

  ngOnInit(): void {

  }
}