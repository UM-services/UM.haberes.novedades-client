import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export interface MenuItem {
  label: string;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private authService = inject(AuthService);
  private router = inject(Router);

  private currentMenu = new BehaviorSubject<MenuItem[]>([]);
  public currentMenu$ = this.currentMenu.asObservable();

  private menuHistory: MenuItem[][] = [];

  constructor() {
    this.setMainMenu();
  }

  private setMainMenu() {
    const mainMenu: MenuItem[] = [
      { label: 'Planta', action: () => this.setPlantaMenu() },
      { label: 'Consultas', action: () => this.setConsultasMenu() },
      { label: 'Fin', action: () => this.finAction() }
    ];
    this.setCurrentMenu(mainMenu, true);
  }

  private setPlantaMenu() {
    const plantaMenu: MenuItem[] = [
      { label: 'Asignación Cursos', action: () => {} },
      { label: 'Anotador Profesores', action: () => {} },
      { label: 'Designaciones', action: () => {} },
      { label: 'Volver', action: () => this.goBack() }
    ];
    this.setCurrentMenu(plantaMenu);
  }

  private setConsultasMenu() {
    const consultasMenu: MenuItem[] = [
      { label: 'Cargos por Legajo', action: () => {} },
      { label: 'Docentes por Sede', action: () => {} },
      { label: 'Volver', action: () => this.goBack() }
    ];
    this.setCurrentMenu(consultasMenu);
  }

  private finAction() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private setCurrentMenu(menu: MenuItem[], isMainMenu = false) {
    if (!isMainMenu && this.currentMenu.value.length > 0) {
      this.menuHistory.push(this.currentMenu.value);
    } else if (isMainMenu) {
      this.menuHistory = [];
    }
    this.currentMenu.next(menu);
  }

  goBack() {
    const previousMenu = this.menuHistory.pop();
    if (previousMenu) {
      // We go back without pushing to history again
      this.currentMenu.next(previousMenu);
    } else {
      this.setMainMenu();
    }
  }
}

