import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';
import { EdicaoClienteComponent } from './components/edicao-cliente/edicao-cliente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "clientes/cadastro", //ROTA
        component: CadastroClienteComponent //COMPONENTE
    },
    {
        path: "clientes/consulta", //ROTA
        component: ConsultaClienteComponent //COMPONENTE
    },
    {
        path: "clientes/edicao/:id", //ROTA
        component: EdicaoClienteComponent //COMPONENTE
    },
    {
        path: "clientes/dashboard", //ROTA
        component: DashboardComponent //COMPONENTE
    },
    {
        path: "",//PAGINA INICIAL
        pathMatch: "full",//ROTA DEFAULT DO PROJETO
        redirectTo: "/clientes/dashboard" //ROTA
    }
];
