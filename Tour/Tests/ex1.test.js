import {sum, sub, mult, div} from './ex1'

beforeAll(() => {
  console.log("Example Test Suite has have started...")
  console.log("prints before the test suite is ran, only once")
});

afterAll(() => {
  console.log("Example Test Suite has have ended...")
  console.log("prints after the entire test suite is ran, only once")
});

beforeEach(() => {console.log("this should print before each test")});

afterEach(() => {console.log("this should print after each test")});

describe('addition and subtraction test cases', () => {
  beforeEach(() => {console.log("applies only to test cases within this describe block");});

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  test('subtracts 2 from 10 to equal 8', () => {
    expect(sub(10, 2)).toBe(8);
  });

}); 

describe('multiplication and division test cases', () => {
  beforeEach(() => {console.log("applies only to test cases within this describe block for mult and div");});

  test('multiply works', () => {
    expect(mult(100, 2)).toBe(200);
  });
  
  test('divide works', () => {
    expect(div(10, 2)).toBe(5);
  });

}); 
