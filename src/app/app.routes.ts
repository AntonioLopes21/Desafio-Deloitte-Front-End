import { Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeClienteComponent } from './pages/home-cliente/home-cliente.component';
import { HomeProfissionalComponent } from './pages/home-profissional/home-profissional.component';


export const routes: Routes = [
    { path: 'cadastrar', component: CadastrarUsuarioComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home-cliente', component: HomeClienteComponent },
    { path: 'home-profissional', component: HomeProfissionalComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
