import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { KeycloakAuthService } from '../../services/auth/keycloak-auth.service';

@Component({
  selector: 'app-confirmar-senha',
  templateUrl: './confirmar-senha.component.html',
  styleUrl: './confirmar-senha.component.css'
})
export class ConfirmarSenhaComponent {
  private http: HttpClient = inject(HttpClient);
  private keycloakAuth: KeycloakAuthService = inject(KeycloakAuthService);
}
