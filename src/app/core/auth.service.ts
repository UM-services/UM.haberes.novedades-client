import { Injectable } from '@angular/core';
import { of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private user: { legajo: string, nombre: string } | null = null;

  constructor() {
    // Check session storage on service initialization
    const user = sessionStorage.getItem('user');
    if (user) {
      this.loggedIn = true;
      this.user = JSON.parse(user);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser() {
    return this.user;
  }

  login(legajo: string, contrasena: string): Observable<{ success: boolean, message?: string }> {
    // Simulamos una validación
    if (legajo) {
      this.loggedIn = true;
      const nombre = 'Juan Perez (Simulado)'; // Nombre de ejemplo
      this.user = { legajo, nombre };
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Legajo incorrecto' });
    }
  }

  logout(): void {
    this.loggedIn = false;
    this.user = null;
    sessionStorage.removeItem('user');
  }
}
