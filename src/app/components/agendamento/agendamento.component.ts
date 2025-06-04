import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProfissionaisService } from '../../services/profissionais.service';
import { AgendamentosService } from '../../services/agendamentos.service';
import { Profissional } from '../../models/profissional.interface';
import { Agendamento } from '../../models/agendamento.interface';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {
  profissional: Profissional | null = null;
  dataSelecionada: string = '';
  horarioSelecionado: string = '';
  horariosDisponiveis: string[] = [];
  agendamentoRealizado: boolean = false;
  hoje: string = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

  constructor(
    private route: ActivatedRoute,
    private profissionaisService: ProfissionaisService,
    private agendamentosService: AgendamentosService
  ) {}

  ngOnInit() {
    const idProfissional = this.route.snapshot.params['id'];
    this.carregarProfissional(idProfissional);
  }

  carregarProfissional(id: number) {
    this.profissionaisService.getProfissionalById(id).subscribe(
      profissional => {
        this.profissional = profissional;
        this.atualizarHorariosDisponiveis();
      }
    );
  }

  atualizarHorariosDisponiveis() {
    if (this.profissional && this.dataSelecionada) {
      this.horariosDisponiveis = this.profissional.disponibilidade;
    }
  }

  realizarAgendamento() {
    if (this.profissional && this.dataSelecionada && this.horarioSelecionado) {
      // Combina a data e hora selecionadas
      const dataHoraInicio = new Date(`${this.dataSelecionada}T${this.horarioSelecionado}`);
      const dataHoraFim = new Date(dataHoraInicio);
      dataHoraFim.setHours(dataHoraFim.getHours() + 1); // Duração padrão de 1 hora

      const novoAgendamento: Agendamento = {
        id: 0,
        clienteId: 1, // TODO: Obter do serviço de autenticação
        profissionalId: this.profissional.id,
        servicoId: 1, // TODO: Obter do serviço selecionado
        dataHoraInicio: dataHoraInicio.toISOString(),
        dataHoraFim: dataHoraFim.toISOString(),
        status: 'AGENDADO'
      };

      this.agendamentosService.criarAgendamento(novoAgendamento).subscribe(
        () => {
          this.agendamentoRealizado = true;
        }
      );
    }
  }
} 