import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { LoginRequest } from '../Models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginRequest: LoginRequest = { userName: '', password: '' };
  errorMessage = '';
  valid = false;

  constructor(private authService: AuthService, private router: Router) {}

   checkValid() {
    this.valid = !!(this.loginRequest.userName && this.loginRequest.password);
  }

  login() {
    if (!this.loginRequest.userName || !this.loginRequest.password) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    this.authService.login(this.loginRequest).subscribe({
      next: (response: any) => {
        // ✅ Assume API returns a token like { token: 'xyz' }
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Login successful!');
          this.router.navigate(['/product']); // ✅ Navigate to product page
        } else {
          this.errorMessage = 'Invalid response from server.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
