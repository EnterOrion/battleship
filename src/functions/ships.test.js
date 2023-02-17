/* eslint-disable no-undef */
import shipFactory from './ships.js';
const testShip = shipFactory(3);
const testShip2 = shipFactory(3);
testShip2.hit();
testShip2.hit();
testShip2.hit();


test('returns length', () => {
    expect(testShip.length).toBe(3);
})

test('returns sunk status, false', () => {
    expect(testShip.isSunk()).toBe(false);
})

test('returns sunk status, true', () => {
    expect(testShip2.isSunk()).toBe(true);
})