import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  private apiUrlSg = 'http://localhost:3000/api/sugestoes';
  constructor(private http: HttpClient) { }

  cadastrarUsuario(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /////// SUGESTÃO ///////


  cadastrarSugestao(dados: any): Observable<any> {
    return this.http.post(this.apiUrlSg, dados);
  }


  listarSugestões(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSg);
  }


}
