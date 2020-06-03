// 既に動きが決まっていて"このクラスの修正は出来ない"前提です。
class MessageCreator {
  message(dayPeriod) {
    if(dayPeriod.isMorning()) {
      console.log('おはようございます！');
    } else if(dayPeriod.isAfterNoon()) {
      console.log('こんにちは');
    } else if(dayPeriod.isNight()) {
      console.log('こんばんは');
    } else {
      throw new Error('どの時間帯でも無いので挨拶できません')
    }
  }
}

// こちらも既に動きが決まっていて"このクラスの修正は出来ない"前提です。
class Clock {
  #time
  constructor(time = new Date) {
    this.#time = time;
  }1

  getTime() {
    return this.#time;
  }
}

// Clockの持っている時刻に従ってメッセージを作りたいのでAdapterを作ります。
class ClockMessageAdapter {
  #clock
  constructor(clock) {
    this.#clock = clock;
  }

  isMorning() {
    let hours = this.#clock.getTime().getHours();
    return 5 <= hours && hours < 12;
  }

  isAfterNoon() {
    let hours = this.#clock.getTime().getHours();
    return 12 <= hours && hours < 17;
  }

  isNight() {
    let hours = this.#clock.getTime().getHours();
    return (17 <= hours && hours < 24) || (0 <= hours && hours < 5);
  }
}

// 本来一緒に利用するのが難しかった ClockとMessageCreatorを連携させられる
let messageCreator = new MessageCreator;
{
  let clock = new Clock(new Date(2020, 5, 1, 8));
  let adapter = new ClockMessageAdapter(clock);

  messageCreator.message(adapter);
}

{
  let clock = new Clock(new Date(2020, 5, 1, 2));
  let adapter = new ClockMessageAdapter(clock);

  messageCreator.message(adapter);
}


//////////////////////////////////////////////////////////////
// Q1. 下記のTimeByStringクラスの内容がMessageCreatorで利用できるような
// TimeMessageAdapterを作成しましょう。動作確認コードも書いてください

const TIME_STRINGS = ['朝', '昼', '晩'];

class TimeByString {
  #string
  constructor(string) {
    if(!TIME_STRINGS.includes(string)) { throw Error(`${string}は指定できません。`) }
    this.#string = string;
  }

  getString() {
    return this.#string;
  }
}

class TimeMessageAdapter {
  #timeByString
  constructor(timeByString) {
    this.#timeByString = timeByString;
  }

  isMorning() {
    let time = this.#timeByString.getString();
    return time === '朝';
  }

  isAfterNoon() {
    let time = this.#timeByString.getString();
    return time === '昼';
  }

  isNight() {
    let time = this.#timeByString.getString();
    return time === '晩';
  }
}

{
  let timeByString = new TimeByString('朝');
  let adapter = new TimeMessageAdapter(timeByString);

  messageCreator.message(adapter);
}
{
  let timeByString = new TimeByString('晩');
  let adapter = new TimeMessageAdapter(timeByString);

  messageCreator.message(adapter);
}


//////////////////////////////////////////////////////////////
// Q2. Adapterパターンのクラスの構造は、Decoratorパターンとよく似ています。
// どういう点が異なるのか、利用シーンや目的に違いがあるのかを考察しましょう。

// A2. Decoratorは元のクラスを上書きすることで何度も別の機能を実装していた．
// アルゴリズムが違うパターンの物を実装する際に用いる．

// Adapterは間に互換性のあるクラスを挟むことで，
// 当てはめたいクラス（Clock,TimeByString）ロジックを
// 元のクラス（MessageCreator）に利用できる形に変換していた．
// 基本アルゴリズムは同じだがデータなどタネとなる元が違う時に用いる．

//////////////////////////////////////////////////////////////
// Q3. Adapterパターンのクラスの構造は、Strategyパターンとほぼ同じです。
// どういう点が異なるのか、利用シーンや目的に違いがあるのかを考察しましょう。

// A3. 最終動作が変わらず，ロジックが外にある点ではどちらも同じ．

// Strategyは出力の変更を容易にするために，ロジックを外に出しメンテナンスを容易にした．

// Adapterは出力は一緒だが入力されるデータが違うため，
// 別で出力にデータが合う様にロジックを組み直している．




