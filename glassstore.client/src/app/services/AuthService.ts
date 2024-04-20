import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Token } from '../models/Auth/Token';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export const ACCESS_TOKEN='access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>('/Auth/Login', {
      email, password
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN, token.access_token);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && !this.jwtHelper.isTokenExpired(token))
      return true;
    else
      return false;
    
  }
  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    this.router.navigate(['']);
  }
}
