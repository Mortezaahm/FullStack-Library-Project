import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Book {
  id: number;
  title: string;
  author: string;
  publishDate: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './books.html'
})
export class Books implements OnInit {
  books: Book[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // API backend URL should be replaced with actual endpoint
    this.http.get<Book[]>('http://localhost:5131/api/books')
      .subscribe(data => this.books = data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
