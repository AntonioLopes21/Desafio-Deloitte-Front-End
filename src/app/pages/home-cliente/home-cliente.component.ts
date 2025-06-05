import { Component, OnInit } from '@angular/core';
import { AgendamentosService } from '../../services/agendamentos.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home-cliente',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent implements OnInit {
  agendamentos: any[] = [];
  carregando: boolean = true;

  constructor(private agendamentoService: AgendamentosService) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.getProximosAgendamentos().subscribe({
      next: (data) => {
        this.agendamentos = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar agendamentos:', err);
        this.carregando = false;
      }
    });
  } 
}