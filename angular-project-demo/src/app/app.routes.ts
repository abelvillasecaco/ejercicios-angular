import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { NotFound } from './components/not-found/not-found';
import { Contact } from './components/contact/contact';
import { Login } from './components/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // 👈 Esto es CLAVE
  },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'products', component: ProductList },
  {
    path: 'products/:id',
    component: ProductDetail,
    canActivate: [authGuard],
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact').then((m) => m.Contact),
  },
  { path: '**', component: NotFound },
];
