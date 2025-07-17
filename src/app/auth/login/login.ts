import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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

  errorMessage: string | null = null;
  nombreUsuario: string | null = null;

  onLegajoChange() {
    const legajo = this.loginForm.get('legajo')?.value;
    if (legajo) {
      // Simulamos la obtención del nombre
      this.nombreUsuario = 'Juan Perez (Simulado)';
    } else {
      this.nombreUsuario = null;
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { legajo, contrasena } = this.loginForm.value;
      this.authService.login(legajo!, contrasena!).subscribe(result => {
        if (result.success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = result.message || 'Error en el login.';
          this.nombreUsuario = null;
        }
      });
    }
  }
}