import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  tipoUsuario: 'CLIENTE' | 'PROFISSIONAL' = 'CLIENTE';
  erro: string = '';
  carregando: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem!';
      return;
    }

    this.carregando = true;
    this.erro = '';

    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipoUsuario: this.tipoUsuario
    };

    this.usuarioService.cadastrar(usuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.carregando = false;
      },
      error: (err) => {
        this.erro = err.error?.message || err.message || 'Erro no cadastro';
        this.carregando = false;
      }
    });
  }
}