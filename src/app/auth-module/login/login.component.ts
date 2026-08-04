import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/api/usuario.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { Router } from '@angular/router';
import { UsuarioResponse } from '../../interfaces/usuario-request';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private usuarioService: UsuarioService = inject(UsuarioService);
  private storageService: StorageServiceService = inject(StorageServiceService);
  private router: Router = inject(Router);
  private oauthService: OAuthService = inject(OAuthService);
  private message = inject(NzMessageService);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async loginWithGoogle() {
    const authCodeFlowConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      clientId: '5118366054-brr6mo7bfp8rhbcjp9js2q88ib99up0r.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/welcome/dashboard',
      logoutUrl: window.location.origin,
      strictDiscoveryDocumentValidation: false,
      sessionChecksEnabled: true,
      scope: 'openid profile email',
      responseType: 'code'
    };

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.setupAutomaticSilentRefresh();

    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    if (this.oauthService.hasValidIdToken()) {
      this.actualizarGoogleToken();
    } else {
      this.oauthService.initCodeFlow();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formData = this.loginForm.value;

      this.usuarioService.autenticarUsuario(formData.email, formData.password)
        .subscribe({
          next: (response) => {
            const login: string = JSON.stringify(response.usuarioDto);
            this.storageService.setItem('login', login);
            this.storageService.setItem('token', String(response.token));
            this.message.success('Login realizado com sucesso!');
            this.router.navigateByUrl('/welcome');
            this.initializeForm();
          },
          error: (error) => {
            console.error('Erro ao fazer login:', error);
            this.message.error('Erro ao fazer login. Verifique suas credenciais.');
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private actualizarGoogleToken(): void {
      const token: string = this.oauthService.getIdToken();
      this.usuarioService.autenticarComGoogle(token)
      .subscribe({
        next: usuario => {
          this.storageService.setItem('token', String(usuario.token));
          this.storageService.setItem('login', String(usuario.usuarioDto));
          this.message.success('Login realizado com sucesso!');
        },
        error: err => {
          console.error('Erro ao fazer login:', err);
          this.message.error('Erro ao fazer login. Verifique suas credenciais.');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}