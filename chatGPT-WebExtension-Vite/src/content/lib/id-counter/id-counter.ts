import { IdCounter } from "../../types/types";

export class IdCounterSingleton implements IdCounter {
  current: number;
  private static instance: IdCounterSingleton;

  // Private constructor ensures no direct instantiation
  private constructor(initialValue: number = 0) {
    this.current = initialValue;
  }

  // Method to get the single instance of the IdCounterSingleton
  static getInstance(initialValue: number = 0): IdCounterSingleton {
    if (this.instance) {
      return this.instance;
    }

    if (initialValue < 0) {
      throw new Error("Initial value cannot be less than 0");
    }

    this.instance = new IdCounterSingleton(initialValue);
    return this.instance;
  }

  // Increment the current value by 1
  increment(): number {
    this.current += 1;
    return this.current;
  }

  // Decrement the current value by 1
  decrement(): number {
    this.current -= 1;
    return this.current;
  }

  // Reset the current value to 0
  reset(): number {
    this.current = 0;
    return this.current;
  }

  // Specify the current value to a specific number
  specify(num: number): number {
    this.current = num;
    return this.current;
  }

  provideCurrentAndIncrement(): number {
    this.increment();
    return this.current - 1;
  }
}
