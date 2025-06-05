import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email: string = '';
  senha: string = '';
  erro: string = '';
  carregando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  login() {
    this.carregando = true;
    this.erro = '';

    this.usuarioService.login(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/']); // Redireciona para a página inicial após login
      },
      error: (err) => {
        this.erro = err.error?.message || err.message || 'Erro no login';
        this.carregando = false;
      }
    });
  }
}
