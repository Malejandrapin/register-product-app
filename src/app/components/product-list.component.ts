import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../domain/models/product.model';

@Component({
    selector: 'app-product-list',
    imports: [CurrencyPipe],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    readonly products = input<Product[]>([]);
    readonly loading = input(false);
    readonly edit = output<Product>();
    readonly remove = output<Product>();
}
