/* eslint-disable no-undef */
import shipFactory from './ships.js';
import gameboardFactory from './gameboard.js';

const testShip = shipFactory(3);
const testShip2 = shipFactory(3);
const gameboard = gameboardFactory();
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

test('place on board, true', () => {
    expect(gameboard.placeShip(testShip.length, 0, 0, false)).toBe(true);
})

test('place on board, false', () => {
    expect(gameboard.placeShip(testShip.length, 10, 10, false)).toBe(false);
})