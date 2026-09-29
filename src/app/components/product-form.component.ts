import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../domain/models/product.model';
import { ERROR_MESSAGES } from '../domain/constants-errors/error-messages.constants';

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
    readonly errorMessages = ERROR_MESSAGES;
    readonly product = input<Product | null>(null);
    readonly resetVersion = input(0);
    readonly disabled = input(false);
    readonly saved = output<ProductFormValue>();
    readonly cancelled = output<void>();
    readonly form = new FormGroup({
        nameProduct: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.pattern(/^[^\d]*$/)] }),
        description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
        price: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(Number.MIN_VALUE)] }),
        stock: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(Number.MIN_VALUE)] }),
    });

    constructor() {
        effect(() => {
            const product = this.product();
            this.resetVersion();
            this.form.reset(product ? { nameProduct: product.productName, description: product.productDescription, price: product.productPrice, stock: product.productStock } : { nameProduct: '', description: '', price: null, stock: null });
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched(); return;
        }
        const value = this.form.getRawValue();
        this.saved.emit({ ...value, price: value.price!, stock: value.stock! });
    }
}
