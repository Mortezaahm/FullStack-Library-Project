import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}
submit() {
  if (!this.username || !this.password) {
    this.error = 'Please enter username and password';
    return;
  }

  // send login request to backend API
  this.http.post<{ token: string }>('http://localhost:5131/api/auth/login', {
    username: this.username,
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
