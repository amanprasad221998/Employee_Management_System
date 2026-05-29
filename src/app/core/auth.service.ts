import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface User{
  name: string;
  email: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { 
    this.restoreSession();
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private restoreSession(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user){
      const user: User = JSON.parse('userJson');
      this.currentUserSubject.next(user);
    }
  }

  login(email: string,password: string): any{
    if(email === 'user@gmail.com' && password === 'user123'){
      const user: User = {
        name: 'Aman Prasad',
        email:email,
        role: 'user'
      };

      this.saveSession(user, 'user-jwt-token-123');
      this.router.navigate(['/dashboard']);
      return true;
    }

    if(email === 'admin@gmail.com' && password === 'admin123'){
      const user: User = {
        name: 'Admin',
        email: email,
        role: 'admin'
      };
      this.saveSession(user, 'admin-jwt-token-123');
      this.router.navigate(['./dahboard']);
      return true;

    }
    return false;
  }

  private saveSession(user: User, token: string): any{
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): any{
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): any{
    const user = this.currentUserSubject.getValue();
    return user?.role ==='admin';
  }

  getCurrentUser(): User | null{
    return this.currentUserSubject.getValue();
  }
}
