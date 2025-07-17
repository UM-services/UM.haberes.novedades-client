import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName: string | null = null;

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user ? user.nombre : null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}