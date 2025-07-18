import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['isLoggedIn']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        provideZonelessChangeDetection()
      ]
    });
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router) as any;
  });

  it('should allow navigation if logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    let result: boolean = false;
    // Ejecutar el guard en contexto de inyección
    TestBed.runInInjectionContext(() => {
      result = authGuard({} as any, {} as any) as boolean;
    });
    expect(result).toBeTrue();
  });

  it('should redirect to login if not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    let result: boolean = true;
    TestBed.runInInjectionContext(() => {
      result = authGuard({} as any, {} as any) as boolean;
    });
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
