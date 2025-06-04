import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosService } from '../../services/agendamentos.service';
import { Agendamento } from '../../models/agendamento.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-meus-agendamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-agendamentos.component.html',
  styleUrls: ['./meus-agendamentos.component.css']
})
export class MeusAgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  loading = true;
  error: string | null = null;
  filtro: 'todos' | 'futuros' | 'passados' = 'todos';

  constructor(
    private agendamentosService: AgendamentosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.loading = true;
    this.error = null;

    // TODO: Implementar lógica para obter o ID do usuário logado
    const clienteId = 1; // Temporário, deve ser obtido do usuário logado

    this.agendamentosService.getAgendamentosPorCliente(clienteId).subscribe({
      next: (data) => {
        this.agendamentos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar agendamentos. Por favor, tente novamente.';
        this.loading = false;
        console.error('Erro ao carregar agendamentos:', error);
      }
    });
  }

  cancelarAgendamento(id: number): void {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.agendamentosService.cancelarAgendamento(id, 'CANCELADO_CLIENTE').subscribe({
        next: () => {
          this.carregarAgendamentos();
        },
        error: (error) => {
          console.error('Erro ao cancelar agendamento:', error);
          alert('Erro ao cancelar agendamento. Por favor, tente novamente.');
        }
      });
    }
  }

  filtrarAgendamentos(filtro: 'todos' | 'futuros' | 'passados'): void {
    this.filtro = filtro;
  }

  getAgendamentosFiltrados(): Agendamento[] {
    const agora = new Date();
    return this.agendamentos.filter(agendamento => {
      const dataAgendamento = new Date(agendamento.dataHoraInicio);
      switch (this.filtro) {
        case 'futuros':
          return dataAgendamento > agora;
        case 'passados':
          return dataAgendamento < agora;
        default:
          return true;
      }
    });
  }
} 