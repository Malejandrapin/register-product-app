import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES } from '../constants-errors/error-messages.constants';
import { ProductPrice } from './product-price.value-object';

describe('ProductPrice', () => {
    it('conserva un precio positivo válido', () => {
        expect(new ProductPrice(19.99).value).toBe(19.99);
    });

    it('acepta cualquier precio finito mayor que cero', () => {
        expect(new ProductPrice(Number.MIN_VALUE).value).toBe(Number.MIN_VALUE);
    });

    it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
        'rechaza el precio inválido %s',
        (price) => {
            expect(() => new ProductPrice(price)).toThrow(ERROR_MESSAGES.productPriceMustBePositive);
        },
    );
});