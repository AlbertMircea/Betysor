import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

     user$!: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

    ngOnInit(): void {
    // Get current user
    this.user$ = this.authService.user$;
    };

     logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
