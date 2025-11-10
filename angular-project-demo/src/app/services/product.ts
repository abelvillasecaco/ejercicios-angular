import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Laptop Gamer', price: 5500, description: 'Laptop con gráfica RTX 4050' },
    { id: '2', name: 'Mouse inalámbrico', price: 500, description: 'Con sensor de movimiento' },
    { id: '3', name: 'Teclado mecánico', price: 700, description: 'Switches RED' }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
