import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ProductDTO } from "../dto/product.dto";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    private http = inject(HttpClient);

    private readonly apiURL = 'http://localhost:3001/products';

    getProducts(): Observable<ProductDTO[]> {
        return this.http.get<ProductDTO[]>(this.apiURL);
    }

    createProduct(product: ProductDTO): Observable<ProductDTO> {
        return this.http.post<ProductDTO>(this.apiURL, product);
    }

    updateProduct(product: ProductDTO): Observable<void> {
        const url = `${this.apiURL}/${product.id}`;
        return this.http.put<void>(url, product);
    }
    deleteProduct(id: number): Observable<void> {
        const url = `${this.apiURL}/${id}`;
        return this.http.delete<void>(url);
    }
}
