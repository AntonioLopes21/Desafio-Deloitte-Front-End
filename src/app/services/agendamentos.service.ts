import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {
  private apiUrl = 'http://localhost:8080/auth/agendamentos';

  constructor(private http: HttpClient) { }

  getProximosAgendamentos() {
    return this.http.get<any[]>(`${this.apiUrl}/proximos`);
  }

  criarAgendamento(dados: any) {
    return this.http.post(this.apiUrl, dados);
  }
}
