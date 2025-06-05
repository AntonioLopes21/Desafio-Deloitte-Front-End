import { Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'cadastrar', component: CadastrarUsuarioComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
