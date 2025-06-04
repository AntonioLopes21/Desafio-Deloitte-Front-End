import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosService } from '../../services/agendamentos.service';
import { Agendamento } from '../../models/agendamento.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  loading = true;
  error: string | null = null;

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

    // Aqui você pode implementar a lógica para determinar se é cliente ou profissional
    // e chamar o método apropriado
    this.agendamentosService.getAgendamentos().subscribe({
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
} 