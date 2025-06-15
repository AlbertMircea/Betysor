import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,  RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
   user$!: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => alert(err.message));
  }

  logout() {
    this.authService.logout();
  }
}
