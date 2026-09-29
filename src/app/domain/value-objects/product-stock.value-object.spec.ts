import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES } from '../constants-errors/error-messages.constants';
import { ProductStock } from './product-stock.value-object';

describe('ProductStock', () => {
    it('conserva una cantidad positiva válida', () => {
        expect(new ProductStock(10).value).toBe(10);
    });

    it('acepta cantidades positivas finitas', () => {
        expect(new ProductStock(0.5).value).toBe(0.5);
    });

    it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
        'rechaza la cantidad inválida %s',
        (stock) => {
            expect(() => new ProductStock(stock)).toThrow(ERROR_MESSAGES.productStockMustBePositive);
        },
    );
});