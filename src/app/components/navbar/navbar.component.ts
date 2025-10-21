import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { LoginDialogComponent } from 'src/app/shared/dialogs/login-dialog/login-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  usuarioEstaLogueado: boolean = true;
  nombreUsuario: string = "";
  rolUsuario: string = "";

  constructor(private _authService: AuthService){}

  ngOnInit(): void {
      this._authService.estaLogueado$.subscribe(estado => {
      this.usuarioEstaLogueado = estado;

      this.nombreUsuario = localStorage.getItem('USERNAME') || ""
      this.rolUsuario = localStorage.getItem('USERROLE') || ""

      console.log(estado);
      
    });
  }

  cerrarSesion(){
    this._authService.logout();
  }

}
