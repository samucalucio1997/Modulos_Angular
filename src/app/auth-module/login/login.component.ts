import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/api/usuario.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { Router } from '@angular/router';
import { UsuarioResponse } from '../../interfaces/usuario-request';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formData = this.loginForm.value;

      this.usuarioService.autenticarUsuario(formData.email, formData.password)
              .subscribe({
                next: (response) => {
                  const login: string = JSON.stringify(response.user);
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

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // redirectToManagerAccount(): void {
  //   const usuarioResponse:UsuarioResponse = this.storageService.getItem('login') as UsuarioResponse;
  //   const isAdmin = usuarioResponse.;
  // }

  // Getters para facilitar o acesso aos controles no template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}