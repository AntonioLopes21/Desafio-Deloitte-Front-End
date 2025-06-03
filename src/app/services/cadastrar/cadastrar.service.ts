import { Injectable } from '@angular/core';


export interface Usuario{
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    tipoUsuario: string;
  }

@Injectable({
  providedIn: 'root'
})
export class CadastrarService {

  private baseUrl = 'http:localhost8080/usuarios'; //
  
  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: ''
  };

  constructor() { }
}





