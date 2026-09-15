import { ProductDTO } from "../dto/product.dto";
import { Product } from "../../domain/models/product.model";

export class ProductMapper {
    static fromApiToDomain(apiProduct: ProductDTO): Product {
        return new Product(
            apiProduct.id,
            apiProduct.nameProduct,
            apiProduct.description,
            apiProduct.price,
            apiProduct.stock,
        );
    }
    static fromDomainToApi(domainProduct: Product): ProductDTO{
        return{
            id: domainProduct.productId,
            nameProduct: domainProduct.productName,
            description: domainProduct.productDescription,
            price: domainProduct.productPrice,
            stock: domainProduct.productStock
        }
    }
}