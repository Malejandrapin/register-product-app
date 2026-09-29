import { ERROR_MESSAGES } from "../constants-errors/error-messages.constants";

export class ProductName {
    readonly value: string;

    constructor(value: string) {
        const normalizedValue = value.trim();
        if (normalizedValue.length < 3) {
            throw new Error(ERROR_MESSAGES.productNameMinLength);
        }
        if (/\p{N}/u.test(normalizedValue)) {
            throw new Error(ERROR_MESSAGES.productNameContainsNumbers);
        }
        this.value = normalizedValue;
    }
}