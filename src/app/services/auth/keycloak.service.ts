import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak = new Keycloak({
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId
  });

  /**
   * Inicializa o Keycloak com Authorization Code Flow + PKCE.
   * - check-sso: verifica sessão existente silenciosamente
   * - pkceMethod S256: ativa PKCE para segurança adicional
   */
  async init(): Promise<boolean> {
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });

    return authenticated;
  }

  /**
   * Redireciona o usuário para a página de login do Keycloak.
   * Após autenticação, retorna para a URL especificada.
   */
  login(redirectUri?: string): Promise<void> {
    return this.keycloak.login({
      redirectUri: redirectUri ?? window.location.origin + '/welcome'
    });
  }

  /**
   * Redireciona o usuário para a página de registro do Keycloak.
   */
  register(redirectUri?: string): Promise<void> {
    return this.keycloak.register({
      redirectUri: redirectUri ?? window.location.origin + '/welcome'
    });
  }

  /**
   * Encerra a sessão no Keycloak e redireciona para a origem.
   */
  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  /**
   * Retorna o access token atual.
   * O keycloak-js gerencia o token em memória automaticamente.
   */
  getToken(): string | undefined {
    return this.keycloak.token;
  }

  /**
   * Verifica se o usuário está autenticado.
   */
  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  /**
   * Renova o token se estiver próximo da expiração (30 segundos).
   * Retorna true se o token foi renovado ou ainda é válido.
   */
  async updateToken(minValidity: number = 30): Promise<boolean> {
    try {
      const refreshed = await this.keycloak.updateToken(minValidity);
      return refreshed || this.isAuthenticated();
    } catch {
      return false;
    }
  }

  /**
   * Retorna o nome de usuário (preferred_username) do token.
   */
  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }

  /**
   * Retorna o email do usuário do token.
   */
  getEmail(): string | undefined {
    return this.keycloak.tokenParsed?.['email'];
  }

  /**
   * Retorna o nome completo do usuário.
   */
  getFullName(): string | undefined {
    const given = this.keycloak.tokenParsed?.['given_name'] ?? '';
    const family = this.keycloak.tokenParsed?.['family_name'] ?? '';
    return `${given} ${family}`.trim() || undefined;
  }

  /**
   * Retorna o token decodificado (payload).
   */
  getTokenParsed(): Record<string, any> | undefined {
    return this.keycloak.tokenParsed;
  }

  /**
   * Verifica se o usuário possui uma realm role específica.
   */
  hasRole(role: string): boolean {
    return this.keycloak.hasRealmRole(role);
  }

  /**
   * Verifica se o usuário possui uma client role específica.
   */
  hasClientRole(clientId: string, role: string): boolean {
    return this.keycloak.hasResourceRole(role, clientId);
  }
}
