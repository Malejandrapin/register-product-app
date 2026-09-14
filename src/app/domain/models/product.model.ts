export class Product {
    constructor(
        private id: number,
        private nameProduct: string,
        private description: string,
        private price: number,
        private stock: number,
    ) { }
    get productId(): number { return this.id; }

    get productName(): string { return this.nameProduct; }

    get productDescription(): string { return this.description; }

    get productPrice(): number { return this.price; }

    get productStock(): number { return this.stock; }
}
