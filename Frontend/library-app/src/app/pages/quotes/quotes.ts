import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Quote {
  id?: number;
  text: string;
}

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes.html'
})
export class QuoteForm implements OnInit {
  quotes: Quote[] = [];
  newQuote: string = '';
  editQuote: Quote = { text: '' };
  isEditing = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadQuotes();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      const token = localStorage.getItem('token');
      this.http.get<Quote>(`http://localhost:5131/api/quotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(q => this.editQuote = q);
    }
  }

  loadQuotes() {
    const token = localStorage.getItem('token');
    this.http.get<Quote[]>('http://localhost:5131/api/quotes', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => this.quotes = data);
  }

  submit() {
    const token = localStorage.getItem('token');
    if (this.isEditing && this.editQuote.id) {
      this.http.put(`http://localhost:5131/api/quotes/${this.editQuote.id}`, this.editQuote, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => this.router.navigate(['/quotes']));
    } else if (this.newQuote.trim()) {
      this.http.post('http://localhost:5131/api/quotes', { text: this.newQuote }, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        this.newQuote = '';
        this.loadQuotes();
      });
    }
  }

  delete(id?: number) {
    if (!id) return;
    const token = localStorage.getItem('token');
    if (!confirm('Are you sure?')) return;
    this.http.delete(`http://localhost:5131/api/quotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => this.loadQuotes());
  }
}
