import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Books } from './pages/books/books';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'books', component: Books, canActivate: [authGuard] } // protect the books route with the auth guard
];
