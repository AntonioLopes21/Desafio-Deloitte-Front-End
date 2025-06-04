import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfissionaisService } from '../../services/profissionais.service';
import { Profissional } from '../../models/profissional.interface';

@Component({
  selector: 'app-profissionais-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profissionais-lista.component.html',
  styleUrls: ['./profissionais-lista.component.css']
})
export class ProfissionaisListaComponent implements OnInit {
  profissionais: Profissional[] = [];
  profissionaisFiltrados: Profissional[] = [];
  filtroEspecialidade: string = '';
  filtroNome: string = '';

  constructor(private profissionaisService: ProfissionaisService) {}

  ngOnInit() {
    this.carregarProfissionais();
  }

  carregarProfissionais() {
    this.profissionaisService.getProfissionais().subscribe(
      profissionais => {
        this.profissionais = profissionais;
        this.aplicarFiltros();
      }
    );
  }

  aplicarFiltros() {
    this.profissionaisFiltrados = this.profissionais.filter(profissional => {
      const matchEspecialidade = !this.filtroEspecialidade || 
        profissional.especialidade.toLowerCase().includes(this.filtroEspecialidade.toLowerCase());
      const matchNome = !this.filtroNome || 
        profissional.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
      return matchEspecialidade && matchNome;
    });
  }
} 