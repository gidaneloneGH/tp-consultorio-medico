import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaApiLogin } from '../interfaces/response';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:4000/api"
  private usuarioEstaLogueado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public estaLogueado$: Observable<boolean> = this.usuarioEstaLogueado.asObservable();
  
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('TOKEN');

    if (token) {
      this.usuarioEstaLogueado.next(true);
    } else {
      this.usuarioEstaLogueado.next(false);
    }
  }
  
  login(usuario: string, password: string): Observable<RespuestaApiLogin> {
    const endpoint = "/login";
    const url = this.api + endpoint;

    const body = {
      usuario,
      password
    };

    return this.http.post<RespuestaApiLogin>(url, body)
      .pipe(
        tap((respuesta: RespuestaApiLogin) => {
          if (respuesta && respuesta.codigo === 200) {
            
            if (respuesta.jwt) {
              localStorage.setItem('TOKEN', respuesta.jwt);
              localStorage.setItem('USERNAME', respuesta.payload[0].nombre);
              localStorage.setItem('USERROLE', respuesta.payload[0].rol);
              localStorage.setItem('USERID', respuesta.payload[0].id);
            }

            this.usuarioEstaLogueado.next(true);
            
          } else {
            this.usuarioEstaLogueado.next(false);
          }
        })
      );
  }

  logout(){
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('USERID');
    localStorage.removeItem('USERROLE');

    this.router.navigate(['/menu']);
  }

  getToken(): string | null{
    const token = localStorage.getItem('TOKEN');
    console.log(token);

    return token;
  }

  getRolUsuario(): string | null{
    const rol = localStorage.getItem('USERROLE');

    return rol
  }
}
