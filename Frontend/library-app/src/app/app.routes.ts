import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Books } from './pages/books/books';
import { authGuard } from './guards/auth.guard';
import { BookForm } from './pages/book-form/book-form';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'books', component: Books, canActivate: [authGuard] }, // protect the books route with the auth guard
  { path: 'books/new', component: BookForm }, // route for creating a new book
  { path: 'books/edit/:id', component: BookForm } // route for editing an existing book
];
