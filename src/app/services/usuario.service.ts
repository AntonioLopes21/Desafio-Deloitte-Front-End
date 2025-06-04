import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

interface Usuario {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha?: string;
    tipoUsuario: 'CLIENTE' | 'PROFISSIONAL';
  }

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Omit<Usuario, 'confirmarSenha'>): Observable<unknown> {
    return this.http.post(this.apiUrl, usuario);
  }

  cadastrarComValidacao(usuario: Usuario): Observable<unknown> {
    if (usuario.senha !== usuario.confirmarSenha) {
    return throwError(() => new Error('As senhas não coincidem'));
  }
  
  const { confirmarSenha, ...dadosParaEnviar } = usuario;
  return this.http.post(this.apiUrl, dadosParaEnviar);
  }
}
