class Counter {
  constructor(count = 0) {
    this.count = count;
  }

  up() {
    this.count += 1;
  }

  down() {
    this.count -= 1;
  }

  resetValue() {
    this.count = 0;
  }

  getValue() {
    return this.count;
  }
}

let counter1 = new Counter;
counter1.up();
console.log(counter1.getValue()); // => 1と表示される
counter1.up();
console.log(counter1.getValue()); // => 2と表示される
counter1.up();
console.log(counter1.getValue()); // => 3と表示される
counter1.up();
console.log(counter1.getValue()); // => 4と表示される

let counter2 = new Counter;
counter2.down();
console.log(counter2.getValue()); // => -1と表示される
counter2.down();
console.log(counter2.getValue()); // => -2と表示される
counter2.down();
console.log(counter2.getValue()); // => -3と表示される
counter2.down();
console.log(counter2.getValue()); // => -4と表示される