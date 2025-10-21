import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  private api = "http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  getCoberturas(){
    const endpoint = "/obtenerCoberturas";
    const url = this.api + endpoint;

    return this.http.get(url);
  }
}
