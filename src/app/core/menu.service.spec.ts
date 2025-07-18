import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MenuService } from './menu.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('MenuService', () => {
  let service: MenuService;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['logout']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(MenuService);
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set main menu on init', (done) => {
    service.currentMenu$.subscribe(menu => {
      expect(menu.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should call logout and navigate on finAction', () => {
    (service as any).finAction();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
