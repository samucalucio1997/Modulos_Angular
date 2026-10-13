import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, map, catchError, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { UserRepresentation } from '../../interfaces/auth';

export interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  scope: string;
}

export interface KeycloakUserRepresentation {
  requiredActions: string[];
  emailVerified: boolean;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  groups: string[];
  attributes: Record<string, string[] | string>;
  enabled: boolean;
}

/**
 * Serviço para operações administrativas no Keycloak.
 * 
 * NOTA: Com Authorization Code Flow + PKCE, o login é feito
 * diretamente pelo KeycloakService.login() que redireciona
 * para a página do Keycloak. Este serviço mantém apenas
 * operações administrativas via Admin REST API.
 */
@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {

  private http = inject(HttpClient);

  private get tokenUrl(): string {
    return `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/token`;
  }

  private get adminUsersUrl(): string {
    return `${environment.keycloak.url}/admin/realms/${environment.keycloak.realm}/users`;
  }

  /**
   * Registra um novo usuário no Keycloak via Admin REST API.
   * Usa client credentials (service account) para obter um token admin.
   *
   * Requisitos no Keycloak:
   * - Client 'admin-cli' (ou outro confidencial) com Service Account Enabled
   * - Service account precisa da role 'manage-users' do realm-management
   */
  register(
    username: string,
    email: string,
    firstName: string,
    lastName: string
  ): Observable<void> {
    return this.getAdminToken().pipe(
      switchMap(adminToken => {
        const user: KeycloakUserRepresentation = {
          username,
          email,
          firstName,
          lastName,
          enabled: true,
          requiredActions: [],
          emailVerified: false,
          groups: [],
          attributes: {}
        };

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        });

        return this.http.post<void>(this.adminUsersUrl, user, { headers });
      }),
      catchError(err => {
        let message = 'Erro ao criar usuário';
        if (err.status === 409) {
          message = 'Usuário ou email já existe';
        } else if (err.error?.errorMessage) {
          message = err.error.errorMessage;
        }
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * Obtém token administrativo via client credentials.
   */
  private getAdminToken(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.keycloak.adminClientId);
    body.set('client_secret', environment.keycloak.adminClientSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<KeycloakTokenResponse>(this.tokenUrl, body.toString(), { headers }).pipe(
      map(response => response.access_token),
      catchError(() => throwError(() => new Error('Falha ao obter token de administração')))
    );
  }

  /**
   * Busca usuário pelo username.
   */
  getUserIdByUsername(username: string): Observable<UserRepresentation[]> {
    return this.getAdminToken().pipe(
      switchMap(adminToken => {
        const query = new URLSearchParams({
          username: username,
          exact: 'true'
        });

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        });

        return this.http.get<UserRepresentation[]>(
          `${this.adminUsersUrl}?${query.toString()}`,
          { headers }
        );
      })
    );
  }

  /**
   * Dispara ação de definição de senha por e-mail.
   */
  sendPasswordResetEmail(userID: string): Observable<void> {
    return this.getAdminToken().pipe(
      switchMap(adminToken => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        });

        const body = ['UPDATE_PASSWORD'];

        return this.http.put<void>(
          `${this.adminUsersUrl}/${userID}/execute-actions-email`,
          body,
          { headers }
        );
      })
    );
  }
}
