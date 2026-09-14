import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Product } from "../../domain/models/product.model";
import { ProductDTO } from "../dto/product.dto";
import { ProductMapper } from "../../domain/mappers/product.mapper";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    private http = inject(HttpClient);

    private readonly apiURL = 'http://localhost:3001/products';

    getProducts(): Observable<Product[]> {
        return this.http
            .get<ProductDTO[]>(this.apiURL)
            .pipe(map((apiProducts) => apiProducts.map(ProductMapper.fromApiToDomain)));
    }

    createProduct(product: Product): Observable<Product> {
        const apiProduct = ProductMapper.fromDomainToApi(product);
        return this.http
            .post<ProductDTO>(this.apiURL, apiProduct)
            .pipe(map(ProductMapper.fromApiToDomain))
    }

    updateProduct(product: Product): Observable<void> {
        const url = `${this.apiURL}/${product.productId}`;
        return this.http.put<void>(url, product);
    }
    deleteProduct(id: number): Observable<void> {
        const url = `${this.apiURL}/${id}`;
        return this.http.delete<void>(url);
    }
}
