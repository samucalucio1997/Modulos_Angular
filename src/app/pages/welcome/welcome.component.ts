import { Component, inject, OnInit, SimpleChange } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';
import { StorageServiceService } from '../../services/storage-service.service';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
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

  constructor() { }

  ngOnInit() {
    this.modulos = this.permision.getPermission();
    const usuarioResponse: UsuarioResponse = this.storageService.getItem('login') as UsuarioResponse;
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
