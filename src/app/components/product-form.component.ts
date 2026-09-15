import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../domain/models/product.model';

export interface ProductFormValue {
    nameProduct: string;
    description: string;
    price: number;
    stock: number;
}

@Component({
    selector: 'app-product-form',
    imports: [ReactiveFormsModule],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
    readonly product = input<Product | null>(null);
    readonly disabled = input(false);
    readonly saved = output<ProductFormValue>();
    readonly cancelled = output<void>();
    readonly form = new FormGroup({
        nameProduct: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
        stock: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    });

    constructor() {
        effect(() => {
            const product = this.product();
            this.form.reset(product ? { nameProduct: product.productName, description: product.productDescription, price: product.productPrice, stock: product.productStock } : { nameProduct: '', description: '', price: 0, stock: 0 });
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched(); return;
        }
        this.saved.emit(this.form.getRawValue());
    }
}
