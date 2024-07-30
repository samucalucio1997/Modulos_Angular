import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabelaPacienteComponent } from "./tabela-paciente.component";

const routes = [
    { 
        path:'', component:TabelaPacienteComponent,
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class TabelaRoutingModule{}