import * as math from "../src/math.js";

describe('Математика', ()=>{
    test('adds 6 + (-5) to equal 1', ()=>{
        expect(math.sum(6, -5)).toBe(1);
    });
    test('multiply 6 * (-5) to equal -30', ()=>{
        expect(math.multiply(6, -5)).toBe(-30);
    });
})