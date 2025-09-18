import { Observable, Subject } from "rxjs";
import { StorageServiceService } from "../services/storage-service.service";
import { inject } from "@angular/core";
import { LoginResponse, UsuarioResponse } from "../interfaces/usuario-request";
import { ModuloItem } from "../interfaces/modulos/modulo-item";

export class Permission {
    public $modulos: Subject<ModuloItem[]> = new Subject<ModuloItem[]>();
    private storageLocalService: StorageServiceService = inject(StorageServiceService);
    

    getPermission():  ModuloItem[] {
        const usuarioLogado: LoginResponse = this.storageLocalService.getItem('login') as LoginResponse;
        const perfil: string = usuarioLogado.user.authorities?.at(0)?.authority as string;
        
        const modulosAdmin: ModuloItem[] = [
            {
                moduleName: 'Gerenciar-Estoque',
                router: 'gerenciar-estoque'
            },
            {
                moduleName: 'Tabela',
                router: 'tabela'
            },
            {
                moduleName: 'dashboard',
                router: 'dashboard'
            }
        ];
        
        const modulosUser: ModuloItem[] = [
            {
                moduleName: 'Tabela',
                router: 'tabela'
            },
            {
                moduleName: 'dashboard',
                router: 'dashboard'
            }
        ];

        if (perfil == 'ROLE_ADMIN') {
            return modulosAdmin;
        } else {
            return modulosUser;
        }
    }

}    
