import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

interface Book {
  id: number;
  title: string;
  author: string;
  publishDate: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html'
})
export class Books implements OnInit {
  books: Book[] = [];

  constructor(private http: HttpClient, private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Books component initialized');
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }
    this.http.get<Book[]>('http://localhost:5131/api/books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .subscribe({
        next: data => {
          this.books = data;
          this.cdRef.detectChanges();
        },
        error: err => console.error(err)
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
