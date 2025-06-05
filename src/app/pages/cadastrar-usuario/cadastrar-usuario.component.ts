import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  tipoUsuario: 'CLIENTE' | 'PROFISSIONAL' = 'CLIENTE';
  erro: string = '';
  carregando: boolean = false;
  cadastroSucesso: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  cadastrar() {
    
    this.carregando = true;
    this.erro = '';
    this.cadastroSucesso = false;

    const usuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipoUsuario: this.tipoUsuario
    };

    console.log('Dados sendo enviados:', JSON.stringify(usuario, null, 2));

    this.usuarioService.cadastrar(usuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.carregando = false;

        setTimeout(() => {
          this.nome = '';
          this.email = '';
          this.senha = '';
          this.tipoUsuario = 'CLIENTE';
          this.cadastroSucesso = false;
        }, 2000);
      },
      error: (err) => {
        this.erro = err.error?.message || err.message || 'Erro no cadastro';
        this.carregando = false;
      }
    });
  }
}