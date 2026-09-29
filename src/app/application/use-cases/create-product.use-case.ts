import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateProductUseCase {
  private readonly productRepository = inject(ProductRepository);

  execute(product: Product): Observable<Product> {
    return this.productRepository.createProduct(product);
  }
}
