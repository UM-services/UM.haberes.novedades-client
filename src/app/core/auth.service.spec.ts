import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate user with isUserValid', () => {
    let result: boolean | undefined;
    service.isUserValid(1, 'pass').subscribe(r => (result = r));
    const req = httpMock.expectOne('http://127.0.0.1:8580/api/auth/usuario/isUserValid');
    expect(req.request.method).toBe('PUT');
    req.flush(true);
    expect(result).toBeTrue();
  });

  it('should get person data', () => {
    const mockPersona = { nombre: 'Juan', apellido: 'Pérez' };
    let result: any;
    service.getPersonData('123').subscribe(r => (result = r));
    const req = httpMock.expectOne('http://127.0.0.1:8580/api/auth/persona/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockPersona);
    expect(result.nombre).toBe('Juan');
    expect(result.apellido).toBe('Pérez');
  });

  it('should handle error in getPersonData', () => {
    let result: any = {};
    service.getPersonData('999').subscribe(r => (result = r));
    const req = httpMock.expectOne('http://127.0.0.1:8580/api/auth/persona/999');
    req.flush('error', { status: 404, statusText: 'Not Found' });
    expect(result && result.nombre).toBeNull();
    expect(result && result.error).toBeDefined();
  });

  it('should login and store user', () => {
    let res: any;
    service.login('1', 'Juan', 'pass').subscribe(r => (res = r));
    expect(res.success).toBeTrue();
    expect(sessionStorage.getItem('user')).toContain('Juan');
  });

  it('should not login with missing data', () => {
    let res: any;
    service.login('', '', '').subscribe(r => (res = r));
    expect(res.success).toBeFalse();
  });

  it('should logout and clear session', () => {
    service.login('1', 'Juan', 'pass').subscribe();
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
    expect(sessionStorage.getItem('user')).toBeNull();
  });
});
