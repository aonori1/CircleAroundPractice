class Calclator {
  #status;
  #value = 0;

  constructor() {
    this.modeDisplay();
  }

  modeDisplay() {
    console.debug("\n> ディスプレイモードです")
    this.#status = new DisplayStatus(this);
  }

  modeAdd() {
    console.debug("\n> 足し算モードです")
    this.#status = new AddStatus(this);
  }

  modeSubtract() {
    console.debug("\n> 引き算モードです")
    this.#status = new SubtractStatus(this);
  }

  input(value) {
    this.#value = this.#status.input(value);
  }

  display() {
    this.#status.display();
  }

  getValue() {
    return this.#value;
  }
}

class BasicStatus {
  #calclator = null
  constructor(calclator) {
    this.#calclator = calclator;
  }

  getValue() { return this.#calclator.getValue(); }

  display() { throw new Error('この機能は使えません') }

  input(_value) { throw new Error('この機能は使えません') }
}

class DisplayStatus extends BasicStatus {
  display() {
    console.log(`今の値は ${this.getValue()} です`);
  }
}

class AddStatus extends BasicStatus {
  display() {
    console.log('足し算をします。数値を入力してください');
  }

  input(value) {
    return this.getValue() + value;
  }
}

let calc = new Calclator();
calc.display();

// 足し算
calc.modeAdd();
calc.display();
calc.input(10);

// 表示状態に変更して結果の確認
calc.modeDisplay();
calc.display();

// 足し算
calc.modeAdd();
calc.display();
calc.input(20);

// 今の結果の確認
calc.modeDisplay();
calc.display();

try {
  calc.input(11);
} catch {
  console.log('ディスプレイモードでinputは対応していないので例外です')
}


// Calclatorは今の状態を変数で持っていて、モードの切り替えによって
// displayやinputの動作が変わります。
// 「状態を持つ」と言うと、if文で状態を判断して動きを変えそうですね。
// このコードでif文はどこにあるでしょうか。

//////////////////////////////////////////////////////////////
// Q1. 引き算のモードSubtractStatusも作成しましょう。動作確認コードも書いてください。
class SubtractStatus extends BasicStatus {
  display() {
    console.log('引き算をします。数値を入力してください');
  }

  input(value) {
    return this.getValue() - value;
  }
}

calc.modeDisplay();
calc.display();

calc.modeSubtract();
calc.display();
calc.input(10);

calc.modeDisplay();
calc.display();

//////////////////////////////////////////////////////////////
// Q2. もしもStatusクラスを作成せずに、Calclatorが#statusを文字列で持っていた場合
// このコードとどのような違いが生まれるか考察しましょう。
// （Calclatorの使い方は変わらずに、実装のみ変更とします）。

// 外部でそれぞれ#statusの文字列を確認し判別，そしてそれに合わせて
// インスタンスかをするクラスまたはメソッドを作成する必要が出てくる．
// そうするとコードが複雑になることと，変更があった場合に二ヶ所を変更する必要も出てくる．

// Stateがなく一つのクラスで完結させようとするとネストが深くなってしまったり，
// 他で一部機能を使用したい時に不便になる．
