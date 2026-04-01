import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html'
})
export class BookForm implements OnInit {
  id: number | null = null;

  book = {
    title: '',
    author: '',
    publishDate: ''
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.http.get<any>(`http://localhost:5131/api/books/${this.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .subscribe(data => this.book = data);
    }
  }

  submit() {
    const token = localStorage.getItem('token');

    if (this.id) {
      // Only include fields that have values to avoid overwriting existing data with empty values
      const payload: any = {};
      if (this.book.title) payload.title = this.book.title;
      if (this.book.author) payload.author = this.book.author;
      if (this.book.publishDate) payload.publishDate = this.book.publishDate;

      // if all fields are filled, -> PUT, otherwise -> PATCH
      // UPDATE
      if (this.book.title && this.book.author && this.book.publishDate) {
      this.http.put(`http://localhost:5131/api/books/${this.id}`, {
        id: this.id,
        ...this.book
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => this.router.navigate(['/books']));
      }
      // if not all fields are filled, -> PATCH
      else {
        this.http.patch(`http://localhost:5131/api/books/${this.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => this.router.navigate(['/books']));
    }
    } else {
      // CREATE
      this.http.post('http://localhost:5131/api/books', this.book, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => this.router.navigate(['/books']));
    }
  }
}
