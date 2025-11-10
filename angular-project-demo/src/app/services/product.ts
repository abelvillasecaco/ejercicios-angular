import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Laptop Gamer', description: 'Laptop con GPU RTX 4060', price: 2500 },
    { id: '2', name: 'Mouse Inalámbrico', description: 'Sensor óptico de alta precisión', price: 60 },
    { id: '3', name: 'Teclado Mecánico', description: 'Switches Red, RGB', price: 120 }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
