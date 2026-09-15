import { inject, Injectable } from "@angular/core";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductService } from "../services/product.service";
import { Observable, map } from "rxjs";
import { Product } from "../../domain/models/product.model";
import { ProductMapper } from "../mappers/product.mapper";


@Injectable({
    providedIn: 'root',
})

export class ProductRepositoryImpl implements ProductRepository {
    private readonly productService = inject(ProductService);

    getProducts(): Observable<Product[]>{
        return this.productService.getProducts().pipe(
            map((products) => products.map(ProductMapper.fromApiToDomain))
        );
    }

    createProduct(product: Product): Observable<Product>{
        const productDTO = ProductMapper.fromDomainToApi(product);

        return this.productService.createProduct(productDTO).pipe(
            map(ProductMapper.fromApiToDomain)
        );
    }
    updateProduct(product: Product): Observable<void>{
        return this.productService.updateProduct(ProductMapper.fromDomainToApi(product));
    }
    deleteProduct(id: number): Observable<void>{
        return this.productService.deleteProduct(id);
    }
}