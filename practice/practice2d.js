class EvenCounter {
  constructor(count = 0, evenCount = 0) {
    this.count = count;
    this.evenCount = evenCount;
  }

  up() {
    this.count += 1;
    if( this.count % 2 === 0) {
      this.evenCount += 1;
    }
  }

  down() {
    this.evenCount -= 1;
  }

  resetValue() {
    this.count = 0;
    this.evenCount = 0;
  }

  getValue() {
    return this.evenCount;
  }
}

let counter = new EvenCounter;
counter.up(); // => ここではアップしない
console.log(counter.getValue()); // => 0と表示される
counter.up(); // => ここでアップ
console.log(counter.getValue()); // => 1と表示される
counter.up(); // => ここではアップしない
counter.up(); // => ここでアップ
counter.up(); // => ここではアップしない
console.log(counter.getValue()); // => 2と表示される
counter.down();
console.log(counter.getValue()); // => 1と表示される
counter.up(); // => ここでアップ
console.log(counter.getValue()); // => 2と表示される


// class EvenCounter {
//   constructor(evenCount = 0) {
//     this.evenCount = evenCount;
//   }

//   up() {
//     this.evenCount += 1;
//   }

//   down() {
//     this.evenCount -= 2;
//   }

//   resetValue() {
//     this.evenCount = 0;
//   }

//   getValue() {
//     return this.evenCount/2 | 0;
//   }
// }

// let counter = new EvenCounter;
// counter.up(); // => ここではアップしない
// console.log(counter.getValue()); // => 0と表示される
// counter.up(); // => ここでアップ
// console.log(counter.getValue()); // => 1と表示される
// counter.up(); // => ここではアップしない
// counter.up(); // => ここでアップ
// counter.up(); // => ここではアップしない
// console.log(counter.getValue()); // => 2と表示される
// counter.down();
// console.log(counter.getValue()); // => 1と表示される
// counter.up(); // => ここでアップ
// console.log(counter.getValue()); // => 2と表示される