import { Component, inject, OnInit, SimpleChange } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';
import { StorageServiceService } from '../../services/storage-service.service';
import { Router } from '@angular/router';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { UsuarioResponse } from '../../interfaces/usuario-request';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = true;
  private $modulos = new Subject<ModuloItem[]>();
  private storageService: StorageServiceService = inject(StorageServiceService);
  public modulos: ModuloItem[] = [];
  public usuarioResponse!: UsuarioResponse;
  public permision: Permission = inject(Permission);
  private oauthService: OAuthService = inject(OAuthService);
  private router: Router = inject(Router);

  private async carregarUsuario(): Promise<void> {
    const usuarioLocal = this.storageService.getItem('login') as UsuarioResponse | null;

    if (usuarioLocal) {
      this.usuarioResponse = usuarioLocal;
      return;
    }

    const claims = this.oauthService.getIdentityClaims() as any;

    if (claims) {
      this.usuarioResponse = {
        ...(claims as UsuarioResponse),
        nome: claims.name ?? claims.given_name ?? claims.preferred_username ?? '',
        email: claims.email ?? ''
      };

      console.log(this.usuarioResponse);
      return;
    }
    
    console.log('Nenhum dado de usuário encontrado no token do Google');
  }

  ngOnInit() {
    this.modulos = this.permision.getPermission();
    const usuarioResponse: UsuarioResponse = this.storageService.getItem('login') as UsuarioResponse;

    this.carregarUsuario();
    if (!usuarioResponse) {
      // this.oauthService.
      console.log('vindo do google => ', this.oauthService.loadUserProfile());
    }
    this.usuarioResponse = usuarioResponse;
  }

  getModulos(): ModuloItem[] {
    return this.modulos;
  }

  handlerLogOut(): void {
    this.oauthService.logOut();
    this.storageService.removeItem('token');
    this.storageService.removeItem('login');
    // console.log(this.storageService.getItem('login'));
    this.router.navigate(['/login']);
  }

  handleTuggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
