import { ERROR_MESSAGES } from "../constants-errors/error-messages.constants";

export class ProductDescription{
    readonly value: string;

    constructor(value: string){
        if(value.trim().length < 5){
            throw new Error(ERROR_MESSAGES.productDescriptionMinLength);
        }
        this.value = value; 
    }
}