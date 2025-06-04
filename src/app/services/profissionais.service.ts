import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfissionaisService {
  private apiUrl = 'http://localhost:8080/profissionais'; // Ajuste para sua URL da API

  constructor(private http: HttpClient) { }

  getProfissionais(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(this.apiUrl);
  }

  getProfissionalById(id: number): Observable<Profissional> {
    return this.http.get<Profissional>(`${this.apiUrl}/${id}`);
  }
} 