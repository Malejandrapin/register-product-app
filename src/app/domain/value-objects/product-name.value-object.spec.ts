import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES } from '../constants-errors/error-messages.constants';
import { ProductName } from './product-name.value-object';

describe('ProductName', () => {
    it('normaliza espacios al inicio y al final', () => {
        expect(new ProductName('  Teclado  ').value).toBe('Teclado');
    });

    it('rechaza nombres con menos de tres caracteres', () => {
        expect(() => new ProductName('TV')).toThrow(ERROR_MESSAGES.productNameMinLength);
    });

    it('rechaza nombres vacíos o compuestos solo por espacios', () => {
        expect(() => new ProductName('')).toThrow(ERROR_MESSAGES.productNameMinLength);
        expect(() => new ProductName('   ')).toThrow(ERROR_MESSAGES.productNameMinLength);
    });

    it('rechaza nombres que contienen números', () => {
        expect(() => new ProductName('Teclado2')).toThrow(ERROR_MESSAGES.productNameContainsNumbers);
    });

    it('acepta nombres de exactamente tres caracteres', () => {
        expect(new ProductName('TVs').value).toBe('TVs');
    });
});