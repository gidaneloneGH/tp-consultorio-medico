import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  
  admin: string = 'Sr/a. Pérez';
  
  constructor() { }

  ngOnInit(): void {
  }
}