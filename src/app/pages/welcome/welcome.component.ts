import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ModuloItem } from '../../interfaces/modulos/modulo-item';
import { Permission } from '../../function/permision';
import { Router } from '@angular/router';
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
  private router: Router = inject(Router);
  private keycloakService: KeycloakService = inject(KeycloakService);

  ngOnInit() {
    this.modulos = this.permision.getPermission();
    this.nomeUsuario = this.keycloakService.getUsername() ?? 'Usuário';
  }

  getModulos(): ModuloItem[] {
    return this.modulos;
  }

  handlerLogOut(): void {
    this.keycloakService.clearTokens();
    this.router.navigate(['/auth/login']);
  }

  handleTuggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
