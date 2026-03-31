import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}
submit() {
  if (!this.email || !this.password) {
    this.error = 'Please enter email and password';
    return;
  }

  // send login request to backend API
  this.http.post<{ token: string }>('https://localhost:5131/api/login', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: res => {
      localStorage.setItem('token', res.token); // save JWT
      this.router.navigate(['/books']);
    },
    error: err => {
      this.error = 'Login failed: ' + (err.error?.message || err.statusText);
    }
  });
}
}
