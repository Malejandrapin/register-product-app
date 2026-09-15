import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdateProductUseCase {
  private readonly productRepository = inject(ProductRepository);

  execute(product: Product): Observable<void> {
    return this.productRepository.updateProduct(product);
  }
}
