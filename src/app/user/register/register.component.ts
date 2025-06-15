import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
   imports: [CommonModule, FormsModule,  RouterModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private auth: Auth, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async register() {
    this.errorMessage = '';

    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(this.auth, this.email);
      if (methods.length > 0) {
        this.errorMessage = 'This email is already in use.';
        return;
      }

    await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}

