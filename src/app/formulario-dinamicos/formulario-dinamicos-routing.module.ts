import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioDinamicosComponent } from './formulario-dinamicos.component';

const routes: Routes = [
    {
        path: '',
        component: FormularioDinamicosComponent
    },
    {
        path: 'tabela',
        loadChildren: () => import('../tabela-paciente/tabela-paciente.module').then(m => m.TabelaModule),
        data: { breadcrumb: 'Tabela Paciente' }   
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormularioDinamicosRoutingModule { }