import { NgModule } from "@angular/core";
import { TabelaPacienteComponent } from "./tabela-paciente.component";
import { NzTableComponent, NzTableModule } from "ng-zorro-antd/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TabelaRoutingModule } from "./tabela-paciente-routing.module";
import { CommonModule } from "@angular/common";
import { ProfissionalModule } from "./profissional/profissional.module";

@NgModule({
    declarations:[TabelaPacienteComponent],
    imports:[
        TabelaRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProfissionalModule,
        NzTableModule
    ],
    exports:[TabelaPacienteComponent],
})
export class TabelaModule{}