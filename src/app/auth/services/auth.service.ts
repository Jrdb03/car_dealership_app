import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);

  private _authStatus = signal<AuthStatus>('checking');

  private _token = signal<string | null>(
    localStorage.getItem('token')
  );

  private _roles = signal<string>(
    localStorage.getItem('roles') ?? ''
  );

  private _user = signal<User | null>(
    JSON.parse(localStorage.getItem('user') ?? 'null')
  );

  constructor() {
    this.checkStatus().subscribe();
  }

  // ===== COMPUTED =====

  authStatus = computed(() => this._authStatus());

  token = computed(() => this._token());

  user = computed(() => this._user());

  isAdmin = computed(() =>
    this._roles().includes('ADMINISTRADOR')
  );

  isClient = computed(() => !this.isAdmin());

  // ===== LOGIN =====

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(
        `${baseUrl}/auth/login`,
        { email, password }
      )
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError(() => this.handleAuthError())
      );
  }

  // ===== CHECK STATUS =====

  checkStatus(): Observable<boolean> {

    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');
    const user = JSON.parse(localStorage.getItem('user') ?? 'null') as User | null;

    if (!token || !roles || !user) {
      this.logout();
      return of(false);
    }

    this._token.set(token);
    this._roles.set(JSON.parse(roles));
    this._user.set(user);
    this._authStatus.set('authenticated');

    return of(true);
  }

  // ===== LOGOUT =====

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('user');

    this._token.set(null);
    this._roles.set('');
    this._user.set(null);
    this._authStatus.set('not-authenticated');
  }

  // ===== SUCCESS =====

  private handleAuthSuccess({
    access_token,
    user,
  }: AuthResponse): boolean {

    localStorage.setItem('token', access_token);
    localStorage.setItem('roles', JSON.stringify(user.role));
    localStorage.setItem('user', JSON.stringify(user));

    this._token.set(access_token);
    this._roles.set(user.role);
    this._user.set(user);
    this._authStatus.set('authenticated');

    return true;
  }

  // ===== ERROR =====

  private handleAuthError(): Observable<boolean> {
    this.logout();
    return of(false);
  }
}