import { inject, Injectable } from "@angular/core";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductService } from "../services/product.service";
import { Observable } from "rxjs";
import { Product } from "../../domain/models/product.model";

@Injectable({
    providedIn: 'root',
})

export class ProductRepositoryImpl implements ProductRepository {
    private productService = inject(ProductService)

    getProducts(): Observable<Product[]>{
        return this.productService.getProducts();
    }

    createProduct(product: Product): Observable<Product>{
        return this.productService.createProduct(product);
    }
    updateProduct(product: Product): Observable<void>{
        return this.productService.updateProduct(product);
    }
    deleteProduct(id: number): Observable<void>{
        return this.productService.deleteProduct(id);
    }
}