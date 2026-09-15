import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../application/use-cases/delete-product.use-case';
import { GetProductsUseCase } from '../application/use-cases/get-products.use-case';
import { UpdateProductUseCase } from '../application/use-cases/update-product.use-case';
import { Product } from '../domain/models/product.model';
import { ProductFormComponent, ProductFormValue } from './product-form.component';
import { ProductListComponent } from './product-list.component';

@Component({
    selector: 'app-products-page',
    imports: [ProductFormComponent, ProductListComponent],
    templateUrl: './products-page.component.html', 
    styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
    private readonly getProducts = inject(GetProductsUseCase);
    private readonly createProduct = inject(CreateProductUseCase);
    private readonly updateProduct = inject(UpdateProductUseCase);
    private readonly deleteProduct = inject(DeleteProductUseCase);
    readonly products = signal<Product[]>([]);
    readonly selectedProduct = signal<Product | null>(null);
    readonly loading = signal(false);
    readonly error = signal('');

    constructor() { this.loadProducts(); }

    loadProducts(): void {
        this.loading.set(true);
        this.error.set('');
        this.getProducts.execute().pipe(finalize(() => this.loading.set(false))).subscribe({
            next: (products) => this.products.set(products),
            error: () => this.error.set('No fue posible cargar los productos.'),
        });
    }

    saveProduct(value: ProductFormValue): void {
        const selected = this.selectedProduct();
        const product = new Product(selected?.productId ?? 0, value.nameProduct, value.description, value.price, value.stock);
        this.loading.set(true);
        this.error.set('');
        if (selected) {
            this.updateProduct.execute(product).pipe(finalize(() => this.loading.set(false))).subscribe({
                next: () => this.finishSave(),
                error: () => this.error.set('No fue posible guardar el producto.'),
            });
            return;
        }
        this.createProduct.execute(product).pipe(finalize(() => this.loading.set(false))).subscribe({
            next: () => this.finishSave(),
            error: () => this.error.set('No fue posible guardar el producto.'),
        });
    }

    private finishSave(): void {
        this.selectedProduct.set(null);
        this.loadProducts();
    }

    editProduct(product: Product): void { this.selectedProduct.set(product); }

    removeProduct(product: Product): void {
        if (!window.confirm(`¿Quieres Eliminar el producto: ${product.productName}?`)) return;
        this.loading.set(true);
        this.error.set('');
        this.deleteProduct.execute(product.productId).pipe(finalize(() => this.loading.set(false))).subscribe({
            next: () => this.loadProducts(),
            error: () => this.error.set('No fue posible eliminar el producto.'),
        });
    }

    cancelEdit(): void { this.selectedProduct.set(null); }
}
