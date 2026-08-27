import { Subject } from "rxjs";
import { inject } from "@angular/core";
import { ModuloItem } from "../interfaces/modulos/modulo-item";
import { KeycloakService } from "../services/auth/keycloak.service";

export class Permission {
    public $modulos: Subject<ModuloItem[]> = new Subject<ModuloItem[]>();
    private keycloak: KeycloakService = inject(KeycloakService);

    getPermission(): ModuloItem[] {
        const isAdmin = this.keycloak.hasRole('ADMIN');

        const modulosAdmin: ModuloItem[] = [
            {
                moduleName: 'Gerenciar Estoque',
                router: '../gerenciar-estoque',
                descricao: 'Gerencie o estoque do sistema'
            },
            {
                moduleName: 'Tabela',
                router: '../tabela',
                descricao: 'Visualize e edite tabelas'
            },
            {
                moduleName: 'dashboard',
                router: '../dashboard',
                descricao: 'Painel de controle e estatísticas'
            }
        ];

        const modulosUser: ModuloItem[] = [
            {
                moduleName: 'Tabela',
                router: '../tabela',
                descricao: 'Visualize e edite tabelas'
            },
            {
                moduleName: 'Produtos',
                descricao: 'Veja os produtos',
                router: '../produtos'
            },
            {
                moduleName: 'dashboard',
                router: '../dashboard',
                descricao: 'Painel de controle e estatísticas'
            }
        ];

        return isAdmin ? modulosAdmin : modulosUser;
    }
}
