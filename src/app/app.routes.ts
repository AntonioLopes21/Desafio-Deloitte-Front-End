import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'profissionais',
    loadComponent: () => import('./components/profissionais-lista/profissionais-lista.component').then(m => m.ProfissionaisListaComponent)
  },
  {
    path: 'agendamento',
    loadComponent: () => import('./components/agendamento/agendamento.component').then(m => m.AgendamentoComponent)
  },
  {
    path: 'meus-agendamentos',
    loadComponent: () => import('./components/meus-agendamentos/meus-agendamentos.component').then(m => m.MeusAgendamentosComponent)
  }
];
