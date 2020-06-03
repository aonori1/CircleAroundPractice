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

let counter = new Counter;
counter.up();
console.log(counter.getValue()); // => 1と表示される
counter.up();
console.log(counter.getValue()); // => 2と表示される
counter.down();
console.log(counter.getValue()); // => 1と表示される
counter.resetValue();
console.log(counter.getValue()); // => 0と表示される