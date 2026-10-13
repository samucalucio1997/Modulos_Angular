import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KeycloakAuthService } from '../../services/auth/keycloak-auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  private formBuilder = inject(FormBuilder);
  private keycloakAuth = inject(KeycloakAuthService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { username, email, firstName, lastName } = this.registerForm.value;

      this.keycloakAuth.register(username, email, firstName, lastName)
        .pipe(
          switchMap(() => this.keycloakAuth.getUserIdByUsername(username)),
          switchMap(users => {
            if (users && users.length > 0) {
              return this.keycloakAuth.sendPasswordResetEmail(users[0].id);
            }
            throw new Error('Usuário não encontrado após criação');
          })
        )
        .subscribe({
          next: () => {
            this.message.success('Conta criada com sucesso! Acesse seu email para definir sua senha.');
            this.router.navigateByUrl('/auth/login');
          },
          error: (err) => {
            console.error('Erro ao criar conta:', err);
            this.message.error(err.message || 'Erro ao criar conta. Tente novamente.');
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

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
}
