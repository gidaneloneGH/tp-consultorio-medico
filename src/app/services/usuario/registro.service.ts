import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private api = "http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario){

    const endpoint = "/crearUsuario"
    const url = this.api + endpoint

    return this.http.post(url, usuario);
  }
}
