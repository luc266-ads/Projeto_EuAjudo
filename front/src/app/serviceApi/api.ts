
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Api {


  private apiUrl = `${environment.apiUrl}/api/usuarios`;
  private apiUrlSg = `${environment.apiUrl}/api/sugestoes`;
  private apiUrlQt = `${environment.apiUrl}/api/questionario`;

  constructor(private http: HttpClient) {}

  // ============================
  // TRATAMENTO DE ERROS GLOBAL
  // ============================
  private tratarErro(error: HttpErrorResponse) {
    console.error("Erro na API:", error);

    if (error.error instanceof ErrorEvent) {
      return throwError(() => `Erro no cliente: ${error.error.message}`);
    }

    return throwError(() => error.error?.error || "Erro desconhecido no servidor!");
  }

  // ============================
  // USUÁRIOS
  // ============================

  cadastrarUsuario(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados)
      .pipe(catchError(this.tratarErro));
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(catchError(this.tratarErro));
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.tratarErro));
  }

  // ============================
  // SUGESTÕES
  // ============================

  cadastrarSugestao(dados: any): Observable<any> {
    return this.http.post(this.apiUrlSg, dados)
      .pipe(catchError(this.tratarErro));
  }

  listarSugestoes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSg)
      .pipe(catchError(this.tratarErro));
  }

  deletarSugestao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlSg}/${id}`)
      .pipe(catchError(this.tratarErro));
  }

  // ============================
  // QUESTIONÁRIO
  // ============================

  cadastrarQuestionario(dados: any): Observable<any> {
    return this.http.post(this.apiUrlQt, dados)
      .pipe(catchError(this.tratarErro));
  }

  listarQuestionario(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlQt)
      .pipe(catchError(this.tratarErro));
  }

  deletarQuestionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlQt}/${id}`)
      .pipe(catchError(this.tratarErro));
  }
}
