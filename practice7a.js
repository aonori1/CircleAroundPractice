
class Counter {
  #value
  constructor() {
    this.#value = 0;
  }

  addValue(){
    this.#value += 1;
  }

  getValue(){
    return this.#value;
  }
}

let counter = new Counter; // 数値をカウントアップするクラス
counter.addValue(); //ここでcounterの値を一つ増やしたい
console.log(counter.getValue());
counter.addValue(); //ここでcounterの値を一つ増やしたい
console.log(counter.getValue());