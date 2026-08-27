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

  private _token: string | undefined;
  private _refreshToken: string | undefined;

  async init(): Promise<boolean> {
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });

    if (authenticated) {
      this._token = this.keycloak.token;
      this._refreshToken = this.keycloak.refreshToken;
    }

    return authenticated;
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this._token = accessToken;
    this._refreshToken = refreshToken;
  }

  clearTokens(): void {
    this._token = undefined;
    this._refreshToken = undefined;
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  async logout(): Promise<void> {
    if (this.keycloak.authenticated) {
      await this.keycloak.logout({ redirectUri: window.location.origin });
    }
    this.clearTokens();
  }

  getToken(): string | undefined {
    return this._token ?? this.keycloak.token;
  }

  getRefreshToken(): string | undefined {
    return this._refreshToken ?? this.keycloak.refreshToken;
  }

  isAuthenticated(): boolean {
    return !!(this._token) || (this.keycloak.authenticated ?? false);
  }

  async updateToken(): Promise<boolean> {
    if (this.keycloak.authenticated) {
      const refreshed = await this.keycloak.updateToken(30);
      if (refreshed) {
        this._token = this.keycloak.token;
      }
      return refreshed;
    }

    if (this._refreshToken) {
      return this.refreshDirectToken();
    }

    return false;
  }

  private async refreshDirectToken(): Promise<boolean> {
    try {
      const tokenUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/token`;

      const body = new URLSearchParams();
      body.set('grant_type', 'refresh_token');
      body.set('client_id', environment.keycloak.clientId);
      body.set('refresh_token', this._refreshToken!);

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (!response.ok) return false;

      const data = await response.json();
      this._token = data.access_token;
      this._refreshToken = data.refresh_token;
      return true;
    } catch {
      return false;
    }
  }

  getUsername(): string | undefined {
    if (this.keycloak.tokenParsed) {
      return this.keycloak.tokenParsed['preferred_username'];
    }

    if (this._token) {
      const payload = JSON.parse(atob(this._token.split('.')[1]));
      return payload['preferred_username'];
    }

    return undefined;
  }

  getTokenParsed(): Record<string, any> | undefined {
    if (this.keycloak.tokenParsed) {
      return this.keycloak.tokenParsed;
    }

    if (this._token) {
      return JSON.parse(atob(this._token.split('.')[1]));
    }

    return undefined;
  }

  hasRole(role: string): boolean {
    if (this.keycloak.authenticated) {
      return this.keycloak.hasRealmRole(role);
    }

    const parsed = this.getTokenParsed();
    if (parsed?.['realm_access']?.['roles']) {
      return parsed['realm_access']['roles'].includes(role);
    }

    return false;
  }
}
