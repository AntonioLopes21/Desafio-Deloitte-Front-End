import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeService {

  private apiUrl = 'http://localhost:8080/auth/disponibilidades'

  constructor(private http: HttpClient) { }
  
  getDisponibilidade(profissionalId: string, data: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${profissionalId}`, {
      params: { data }
    });
  }
}
