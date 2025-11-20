import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../Models/login-request';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://neelakandan-app-hcgmcxdch2ftcah2.centralindia-01.azurewebsites.net/api/Auth/token';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
  return this.http.post<{ token: string }>(this.baseUrl, loginRequest, {
    headers: { 'Content-Type': 'application/json' }
  }).pipe(
    tap(response => localStorage.setItem('token', response.token))
  );
}


  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
