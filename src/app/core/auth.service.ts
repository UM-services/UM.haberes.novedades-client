import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, map, catchError } from 'rxjs';
import { PersonaDto } from './models/persona.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private user: { legajo: string, nombre: string } | null = null;
  private apiUrl = 'http://127.0.0.1:8580/api/auth/persona';

  constructor(private http: HttpClient) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.loggedIn = true;
      this.user = JSON.parse(user);
    }
  }

  isUserValid(legajoId: number, password: string) {
    return this.http.put<boolean>(
      'http://127.0.0.1:8580/api/auth/usuario/isUserValid',
      { legajoId, password },
      { headers: { 'Content-Type': 'application/json', 'accept': '*/*' } }
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser() {
    return this.user;
  }

  getPersonData(legajo: string): Observable<{ nombre: string | null, apellido: string | null, error?: string }> {
    if (!legajo) {
      return of({ nombre: null, apellido: null });
    }
    return this.http.get<PersonaDto>(`${this.apiUrl}/${legajo}`).pipe(
      map(data => {
        return { nombre: data.nombre || null, apellido: data.apellido || null };
      }),
      catchError(error => {
        console.error('Error fetching person data:', error);
        return of({ nombre: null, apellido: null, error: 'No se encontró el legajo.' });
      })
    );
  }

  login(legajo: string, nombre: string, contrasena: string): Observable<{ success: boolean, message?: string }> {
    if (legajo && nombre) {
      this.loggedIn = true;
      this.user = { legajo, nombre };
      sessionStorage.setItem('user', JSON.stringify(this.user));
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Datos de usuario incompletos.' });
    }
  }

  logout(): void {
    this.loggedIn = false;
    this.user = null;
    sessionStorage.removeItem('user');
  }
}