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
    if(!product.productName || product.productName.trim().length === 0){
      throw new Error("Product name cannot be empty");
    }
    if(product.productDescription.trim().length < 5){
      throw new Error("Description must be at least 5 characters");
    }
    return this.productRepository.createProduct(product);
  }
}
