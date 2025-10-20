import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RespuestaApiLogin } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = "http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<RespuestaApiLogin>{
    const endpoint = "/login"
    const url = this.api + endpoint

    const body = {
      usuario,
      password
    }

    return this.http.post<RespuestaApiLogin>(url, body);
  }
}
