import { Observable } from "rxjs";
import { Product } from "../models/product.model";

export abstract class ProductRepository {
    abstract getProducts(): Observable<Product[]>;
    abstract createProduct(product: Product): Observable<Product>;
    abstract updateProduct(product: Product): Observable<void>;
    abstract deleteProduct(id: number): Observable<void>;
}