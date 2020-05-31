// Adapterパターンで作った例を利用しています（ここから）。

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
  }

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

// Adapterパターンで作った例を利用しています（ここまで）。

// 上記のようにクラスがたくさん増えてくると、どう使ったらよいのかパッと見た目にわかりにくくなります。
// そこで以下のような処理をマルッと行って細かいクラス構造を気にしなくてよいFacadeを作ります。
// [大事な点] Facadeには細かい実装を入れたりせず、既に作成された他のモジュール達を利用する実装が入ります。

class GreetingFacade {
  #messageCreator
  constructor() {
    this.#messageCreator = new MessageCreator;
  }

  greetForDate(date) {
    let clock = new Clock(date);
    let adapter = new ClockMessageAdapter(clock);
    
    this.#messageCreator.message(adapter);
  }

  // ... 他にもいくつかの似たようなメソッドがある想定で読んでください
}

// 使う人は GreetingFacadeの利用方法だけ分かればよく、内部は知らなくて良いです。
// 例えばドキュメントもGreetingFacadeのことだけ書けば利用する人に伝わります。
// たくさんのクラスをnewしたりせずに、２行で終わるコードにできました。

let facade = new GreetingFacade();
facade.greetForDate(new Date(2020, 5, 1, 8));


//////////////////////////////////////////////////////////////
// Q1. Adapterパターンの課題で書いたTimeMessageAdapterの動作を隠せる
// greetForStringをGreetingFacadeに作成しましょう。動作確認コードも書いてください。

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

//////////////////////////////////////////////////////////////
// Q2. Facadeパターンを積極的に検討するべきタイミングはどういう時か考察しましょう。

