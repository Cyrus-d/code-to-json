import { readdirSync } from 'fs';

/**
 * // todo module js-single-file
 */

/**
 * Add two numbers
 * @param {number} a
 * @param {number} b
 */
export function add(a, b) {
  return a + b;
}

export const SECRET_STRING = 'shhhhh!';

/**
 * A vehicle is a thing that goes places
 *
 * @author Mike North
 *
 * @example
 * // create a new vehicle
 * const v = new Vehicle(4);
 */
class Vehicle {
  /**
   * Create a new vehicle
   * @param {number} numWheels Number of wheels
   */
  constructor(numWheels) {
    this.numWheels = numWheels;
  }
  /**
   * Drive the vehicle
   * @returns {string}
   */
  drive() {
    return `Driving with all ${this.numWheels} wheels`;
  }
}

/**
 * A car is a 4-wheeled vehicle
 *
 * @author Mike North
 *
 * @example
 * // create a new car
 * const v = new Car();
 */
export class Car extends Vehicle {
  /**
   * Create a new car
   */
  constructor() {
    super(4);
  }
}

/**
 * A bike is a 2-wheeled vehicle
 */
export class Bike extends Vehicle {
  constructor() {
    super(2);
  }
}

/**
 * A Unicycle is a 1-wheeled vehicle
 */
export class Unicycle extends Vehicle {
  constructor() {
    super(1);
  }
}
