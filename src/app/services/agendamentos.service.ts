import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {
  private apiUrl = `${environment.apiUrl}/auth/agendamentos`;

  constructor(private http: HttpClient) { }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  getAgendamentosPorCliente(clienteId: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  getAgendamentosPorProfissional(profissionalId: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/profissional/${profissionalId}`);
  }

  criarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento);
  }

  cancelarAgendamento(id: number, motivo: 'CANCELADO_CLIENTE' | 'CANCELADO_PROFISSIONAL'): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancelar`, null, {
      params: { motivo }
    });
  }

  concluirAgendamento(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/concluir`, null);
  }
} 