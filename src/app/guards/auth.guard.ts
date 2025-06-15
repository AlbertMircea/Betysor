import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const currentUser = await firstValueFrom(user(this.auth));
    if (currentUser) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
