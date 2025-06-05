import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  erro: string = '';
  carregando: boolean = false;
  cadastroSucesso : boolean = false;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cadastroSucesso = params['cadastroSucesso'] === 'true';
      
      if (this.cadastroSucesso) {
        setTimeout(() => {
          this.cadastroSucesso = false;
        }, 5000);
      }
    });
  }

  login() {
    this.carregando = true;
    this.erro = '';
    this.cadastroSucesso = false; 

    if (!this.email || !this.senha) {
      this.erro = 'Por favor, preencha todos os campos';
      this.carregando = false;
      return;
    }

    this.usuarioService.login(this.email, this.senha).subscribe({
      next: (resposta) => {
          localStorage.setItem('usuario', JSON.stringify({
            id: resposta.usuario.id,
            email: resposta.usuario.email,
            tipoUsuario: resposta.usuario.tipoUsuario
          }));
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.erro = this.getErrorMessage(err);
        this.carregando = false;
      }
    });
  }

  private getErrorMessage(err: any): string {
    if (err.status === 401) {
      return 'Email ou senha incorretos';
    } else if (err.error?.message) {
      return err.error.message;
    } else if (err.message) {
      return err.message;
    }
    return 'Erro ao conectar com o servidor';
  }
}
