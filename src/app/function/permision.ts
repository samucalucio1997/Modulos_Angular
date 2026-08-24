import { Observable, Subject } from "rxjs";
import { StorageServiceService } from "../services/storage-service.service";
import { inject } from "@angular/core";
import { LoginResponse, UsuarioResponse } from "../interfaces/usuario-request";
import { ModuloItem } from "../interfaces/modulos/modulo-item";
import { OAuthService } from "angular-oauth2-oidc";
import { KeycloakService } from "../services/auth/keycloak.service";

export class Permission {
    public $modulos: Subject<ModuloItem[]> = new Subject<ModuloItem[]>();
    private storageLocalService: StorageServiceService = inject(StorageServiceService);
    private oauthService: OAuthService = inject(OAuthService);
    private keycloak: KeycloakService = inject(KeycloakService);
    

    getPermission():  ModuloItem[] {
        const isAutenticacaoJWT = this.storageLocalService.getItem('login') != null;
        let perfil: string = '';
        if (isAutenticacaoJWT) {
            const usuarioLogado: UsuarioResponse = this.storageLocalService.getItem('login') as UsuarioResponse;
            
            perfil = usuarioLogado.role;
        }

        const isAdmin = this.keycloak.hasRole('ADMIN');


        if (perfil == '') {
            perfil = this.oauthService.getIdToken();
        }

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

        if (perfil == 'ROLE_ADMIN' || isAdmin) {
            return modulosAdmin;
        } else {
            return modulosUser;
        }
    }

}    
