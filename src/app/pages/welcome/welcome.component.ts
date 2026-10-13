import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';
import { KeycloakService } from '../../services/auth/keycloak.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = true;
  private $modulos = new Subject<ModuloItem[]>();
  public modulos: ModuloItem[] = [];
  public nomeUsuario: string = '';
  public permision: Permission = inject(Permission);
  private keycloakService: KeycloakService = inject(KeycloakService);

  ngOnInit() {
    this.modulos = this.permision.getPermission();
    this.nomeUsuario = this.keycloakService.getFullName() 
      ?? this.keycloakService.getUsername() 
      ?? 'Usuário';
  }

  getModulos(): ModuloItem[] {
    return this.modulos;
  }

  /**
   * Faz logout no Keycloak e redireciona para a página inicial.
   * O Keycloak encerra a sessão SSO completamente.
   */
  handlerLogOut(): void {
    this.keycloakService.logout();
  }

  handleTuggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
