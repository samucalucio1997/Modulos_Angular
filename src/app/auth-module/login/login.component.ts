import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../services/auth/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLoading = false;

  private keycloakService = inject(KeycloakService);
  private router = inject(Router);

  ngOnInit(): void {
    // Se já está autenticado, redireciona para a área logada
    if (this.keycloakService.isAuthenticated()) {
      this.router.navigateByUrl('/welcome');
    }
  }

  /**
   * Redireciona para a página de login do Keycloak.
   * O usuário faz login lá e retorna autenticado.
   */
  onLogin(): void {
    this.isLoading = true;
    this.keycloakService.login();
  }

  /**
   * Redireciona para a página de registro do Keycloak.
   * O usuário cria a conta lá e retorna autenticado.
   */
  onRegister(): void {
    this.isLoading = true;
    this.keycloakService.register();
  }
}
