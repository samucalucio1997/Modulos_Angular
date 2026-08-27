import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KeycloakAuthService } from '../../services/auth/keycloak-auth.service';
import { KeycloakService } from '../../services/auth/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  private formBuilder = inject(FormBuilder);
  private keycloakAuth = inject(KeycloakAuthService);
  private keycloakService = inject(KeycloakService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  ngOnInit(): void {
    if (this.keycloakService.isAuthenticated()) {
      this.router.navigateByUrl('/welcome');
      return;
    }

    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;

      this.keycloakAuth.login(username, password).subscribe({
        next: () => {
          this.message.success('Login realizado com sucesso!');
          this.router.navigateByUrl('/welcome');
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          this.message.error(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
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

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
