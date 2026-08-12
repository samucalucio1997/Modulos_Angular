import { Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'meu-realm',
    clientId: 'angular-frontend'
  });

  async init(): Promise<boolean> {
    return await this.keycloak.init({
      onLoad: 'login-required',
      pkceMethod: 'S256'
    });
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  async updateToken(): Promise<boolean> {
    return await this.keycloak.updateToken(30);
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'];
  }

  hasRole(role: string): boolean {
    return this.keycloak.hasRealmRole(role);
  }
}
