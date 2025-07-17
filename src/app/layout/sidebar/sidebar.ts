import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MenuService, MenuItem } from '../../core/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  private menuService = inject(MenuService);
  public menuItems$: Observable<MenuItem[]> = this.menuService.currentMenu$;

  onMenuItemClick(item: MenuItem): void {
    item.action();
  }
}