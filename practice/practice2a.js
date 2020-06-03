class Counter {
  constructor(count = 0) {
    this.count = count;
  }

  up() {
    this.count += 1;
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