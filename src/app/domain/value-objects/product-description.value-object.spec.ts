import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES } from '../constants-errors/error-messages.constants';
import { ProductDescription } from './product-description.value-object';

describe('ProductDescription', () => {
    it('conserva la descripción válida', () => {
        const description = 'Teclado mecánico';

        expect(new ProductDescription(description).value).toBe(description);
    });

    it('acepta descripciones con exactamente cinco caracteres no blancos', () => {
        expect(new ProductDescription(' ABCDE ').value).toBe(' ABCDE ');
    });

    it('rechaza descripciones con menos de cinco caracteres no blancos', () => {
        expect(() => new ProductDescription('ABCD')).toThrow(
            ERROR_MESSAGES.productDescriptionMinLength,
        );
        expect(() => new ProductDescription('    ')).toThrow(
            ERROR_MESSAGES.productDescriptionMinLength,
        );
    });
});