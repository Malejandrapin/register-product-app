import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductUseCase {
  private readonly productRepository = inject(ProductRepository);

  execute(productId: number): Observable<void> {
    return this.productRepository.deleteProduct(productId);
  }
}
