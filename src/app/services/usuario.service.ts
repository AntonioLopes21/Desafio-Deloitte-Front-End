import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

interface Usuario {
    nome: string;
    email: string;
    senha: string;
    tipoUsuario: 'CLIENTE' | 'PROFISSIONAL';
  }

  export interface LoginResponse {
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: string;
  };
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  login(email: string, senha: string): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, senha });

  }
  
  
}
