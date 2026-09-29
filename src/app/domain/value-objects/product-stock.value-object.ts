import { ERROR_MESSAGES } from "../constants-errors/error-messages.constants";

export class ProductStock {
    readonly value: number;

    constructor(value: number) {
        if (!Number.isFinite(value) || value <= 0) {
            throw new Error(ERROR_MESSAGES.productStockMustBePositive);
        }
        this.value = value;
    }
}