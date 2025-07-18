import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    legajo: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  errorMessage: WritableSignal<string | null> = signal(null);
  nombreUsuario: WritableSignal<string | null> = signal(null);
  apellidoUsuario: WritableSignal<string | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor() {
    this.onLegajoChange();
  }

  private onLegajoChange(): void {
    this.loginForm.get('legajo')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.nombreUsuario.set(null);
        this.apellidoUsuario.set(null);
        this.errorMessage.set(null);
        this.isLoading.set(true);
      }),
      switchMap(legajo => this.authService.getPersonData(legajo!))
    ).subscribe(result => {
      this.isLoading.set(false);
      if (result.nombre && result.apellido) {
        this.nombreUsuario.set(result.nombre);
        this.apellidoUsuario.set(result.apellido);
      } else if (result.nombre) {
        this.nombreUsuario.set(result.nombre);
        this.apellidoUsuario.set('');
      } else {
        this.nombreUsuario.set(null);
        this.apellidoUsuario.set(null);
        this.errorMessage.set(result.error || null);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && this.nombreUsuario()) {
      const { legajo, contrasena } = this.loginForm.value;
      const nombreCompleto = this.apellidoUsuario() && this.nombreUsuario()
        ? `${this.apellidoUsuario()}, ${this.nombreUsuario()}`
        : this.nombreUsuario();
      this.isLoading.set(true);
      this.authService.isUserValid(Number(legajo), contrasena!).subscribe(isValid => {
        if (isValid) {
          this.authService.login(legajo!, nombreCompleto!, contrasena!).subscribe(result => {
            this.isLoading.set(false);
            if (result.success) {
              this.router.navigate(['/']);
            } else {
              this.errorMessage.set(result.message || 'Error en el login.');
            }
          });
        } else {
          this.isLoading.set(false);
          this.errorMessage.set('Legajo o contraseña incorrectos.');
        }
      });
    } else if (!this.nombreUsuario()) {
      this.errorMessage.set('Por favor, ingrese un legajo válido.');
    }
  }
}