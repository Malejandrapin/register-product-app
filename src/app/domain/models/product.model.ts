import { ProductDescription } from '../value-objects/product-description.value-object';
import { ProductName } from '../value-objects/product-name.value-object';
import { ProductPrice } from '../value-objects/product-price.value-object';
import { ProductStock } from '../value-objects/product-stock.value-object';

export class Product {
    private readonly nameProduct: ProductName;
    private readonly description: ProductDescription;
    private readonly price: ProductPrice;
    private readonly stock: ProductStock;

    constructor(private id: number, nameProduct: string, description: string, price: number, stock: number,
    ) {
        this.nameProduct = new ProductName(nameProduct);
        this.description = new ProductDescription(description);
        this.price = new ProductPrice(price);
        this.stock = new ProductStock(stock);
    }
    get productId(): number { return this.id; }

    get productName(): string { return this.nameProduct.value; }

    get productDescription(): string { return this.description.value; }

    get productPrice(): number { return this.price.value; }

    get productStock(): number { return this.stock.value; }
}
