
class Counter {
  #value
  constructor() {
    this.#value = 0;
  }

  upValue(){
    this.#value += 1;
  }

  getValue(){
    return this.#value;
  }
}

let counter = new Counter; // 数値をカウントアップするクラス
counter.upValue(); //ここでcounterの値を一つ増やしたい
console.log(counter.getValue());
counter.upValue(); //ここでcounterの値を一つ増やしたい
console.log(counter.getValue());