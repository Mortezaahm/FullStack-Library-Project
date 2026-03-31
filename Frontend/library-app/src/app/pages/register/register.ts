import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class Register {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  submit() {
  if (!this.email || !this.password || this.password !== this.confirmPassword) {
    this.error = 'Invalid input or passwords do not match';
    return;
  }

  this.http.post('https://localhost:5131/api/register', {
    email: this.email,
    password: this.password
  }).subscribe({
    next: res => {
      alert('Registered successfully!');
      this.router.navigate(['/']);
    },
    error: err => {
      this.error = 'Registration failed: ' + (err.error?.message || err.statusText);
    }
  });
}
}
