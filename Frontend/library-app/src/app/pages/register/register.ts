import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  submit() {
  if (!this.username || !this.password || this.password !== this.confirmPassword) {
    this.error = 'Invalid input or passwords do not match';
    return;
  }

  this.http.post('http://localhost:5131/api/auth/register', {
    username: this.username,
    password: this.password
  } , { headers: { 'Content-Type': 'application/json' } }
).subscribe({
    next: res => {
      // console.log('Registration successful:', res);
      alert('Registered successfully!');
      this.router.navigate(['/']);
    },
    error: err => {
      this.error = 'Registration failed: ' + (err.error?.message || err.statusText);
    }
  });
}
}
