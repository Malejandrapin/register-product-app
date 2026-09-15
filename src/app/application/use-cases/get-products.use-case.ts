import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root',
})
export class GetProductsUseCase {
  private readonly productRepository = inject(ProductRepository);

  execute(): Observable<Product[]> {
    return this.productRepository.getProducts();
  }
}
