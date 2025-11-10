import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Login } from './components/login/login';
import { Contact } from './components/contact/contact';
import { authGuard } from './auth.guard';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: Home },
  { path: 'login', component: Home },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetail, canActivate: [authGuard] },
  { path: 'contact', component: Contact },
  { path: '**', component: NotFound },
];
