# 専門用語やデザインパターンの説明集
## デザインパターン
### 1. Decorator
___
- 構造</br>
Decoratorは元のクラスをコンポジションし別の機能を上から追加する．</br>
（必ずしも上から追加ではない書き換えることもある）</br>
デコレートしても元のクラスの使い方と変わらない．
```
class 元のクラス {}
class デコレータ1 {}
class デコレータ2 {}
let 元のクラスインスタンス = new 元のクラス;
let デコレータ1インスタンス = new デコレータ1(元のクラスインスタンス);
let デコレータ2インスタンス = new デコレータ2(元のクラスインスタンス);
```
- 利点</br>
デコレーターのそれぞれのロジックを、適切に組み合わせて使いまわせる．
- 適用に適したシーン</br>
それぞれの機能を小分けにすることで，様々な組み合わせを実現したい時．
- サンプルコード</br>
patterns/1_decorator.js

### 2. TemplateMethod
___
- 構造</br>
主要な構造や出力ロジックは継承元の親クラスで決まっており，</br>
継承先の小クラスではそれぞれ必要にお応じてメソッドをオーバーライドしロジックを変えていく．
```
class 基本構造 {
  method1() {}
  method2() {}
  method3() {}
  method4() {} // ここは共通
}
class 機能1 extends 基本構造 {
  method2() {} // 2だけ基本と違う
}
class 機能2 extends 基本構造 {
  //1と3が基本と違う
  method1() {}
  method3() {}
}
let 機能1インスタンス = new 機能1;
let 機能2インスタンス = new 機能2;
```
- 利点</br>
共通の構造を一つにまとめることができ，改修（変更，修正，リファクタリングなど）が容易になる．
- 適用に適したシーン</br>
中の少しのメソッド又はアルゴリズムが違うだけで，基本構造の同じ機能を複数実装する時．
- サンプルコード</br>
patterns/2_template_method.js

### 3. Factory
___
- 構造</br>
インスタンス化の処理をまとめて，呼び出しの際の状況（今回は引数）に合わせて使用するインスタンスを変えている．
```
class 元の出力 {}
class デコレータ1 {}
class デコレータ2 {}
// 今回は関数だが，クラスにメソッドを書いても良い．
function createFactory(type) {
  let 元の出力インスタンス = new 元の出力;
  if(type === 'デコレータ1') {
    return new デコレータ1(元の出力インスタンス);
  } else if(type === 'デコレータ2') {
    return new デコレータ2(元の出力インスタンス);
  }
  return 元の出力インスタンス; // typeが当てはまらなければ通常オブジェクト
}

元の出力インスタンス = createFactory();
元の出力インスタンス = createFactory('デコレータ1');
元の出力インスタンス = createFactory('デコレータ2');
```
- 利点</br>
どこでインスタンス化を行っているのかが容易に判断でき，改修（変更，修正，リファクタリングなど）が容易になる．
- 適用に適したシーン</br>
デコレータなど（デコレータに限らない）により複数のクラスが誕生し，インスタンス化を多く行う際．</br>
本番環境と開発環境とで生成するクラスを変更する際．</br>
上記の様なそれぞれの状況に合わせてクラス（またはインスタンス）を変更したい時に用いる．
- サンプルコード</br>
patterns/3_factory.js

### 4. Singleton - 世界に一つのオブジェクト - [AbstractFactory]
___
- 構造</br>

```
class 何かクラス {
  static #instance

  static instance() {
    if(!何かクラス.#instance) {
      // ここではやってないが，ここでインスタンス化される実体を変えたりもする．
      何かクラス.#instance = new 何かクラス(); // 唯一のインスタンス
    }
    return 何かクラス.#instance;
  }
  method1() {}
  method2() {}
  // 他の言語の場合には private にする．JSではできない．
  // private constuctor = function(){ }
}
何かクラス.#instance.method1;
```
- 利点</br>
ただ一つのインスタンスが保証される．</br>
（厳密にはJSでは難しい）
- 適用に適したシーン</br>
あるクラスのインスタンスが一つしかないことを保証したい場合</br>
初期化時にコンフィグの情報を保持していたりする．
- サンプルコード</br>
patterns/4_singleton.js

### 5. State - 状態の変更をうまく処理に反映する - [Strategy]
___
- 構造</br>
一つのクラス内のそれぞれのメソッドでインスタンス化している．</br>
**インスタンス化するクラスを変えることで処理を変えている．**</br>
メソッドを呼び出すことで状態を切り替えたかの様に振舞うため，処理内容が変わる．
```
class ChangeState(stateの切り替え機能などを持つ) {
  #status;
  mode1() {
    console.debug("\n> mode1です");
     //stateにあたる
    this.#status = new mode1で行いたい処理のクラス(this);
  }
  mode2() {
    console.debug("\n> mode2です");
     //stateにあたる
    this.#status = new mode2で行いたい処理のクラス(this);
  }
  mode3() {
    console.debug("\n> mode3です");
     //stateにあたる
    this.#status = new mode3で行いたい処理のクラス(this);
  }
  method1() {行いたい処理}
  method2() {行いたい処理}
  method3() {行いたい処理}
}

// Template Methodに近い
class 基本構造 {
  method1() { 共通の基本処理（後のクラスで適宜オーバーライド） }
  method2() { 共通の基本処理（後のクラスで適宜オーバーライド） }
  method3() { 共通の基本処理（後のクラスで適宜オーバーライド） }
}

class mode1で行いたい処理のクラス extends 基本構造 {
  method2() { オーバーライドし処理を書き換える }
}
class mode2で行いたい処理のクラス extends 基本構造 {
  method2() { オーバーライドし処理を書き換える }
  method3() { オーバーライドし処理を書き換える }
}
class mode3で行いたい処理のクラス extends 基本構造 {
  method2() { オーバーライドし処理を書き換える }
  method3() { オーバーライドし処理を書き換える }
}

let ChangeStateのインスタンス = new ChangeState();
// modeによって行われる処理(methodの内容)が違う
ChangeStateのインスタンス.mode1();
ChangeStateのインスタンス.method1();
ChangeStateのインスタンス.method2();
ChangeStateのインスタンス.method3();
ChangeStateのインスタンス.mode2();
ChangeStateのインスタンス.method2();
ChangeStateのインスタンス.mode3();
ChangeStateのインスタンス.method1();
ChangeStateのインスタンス.method3();
```
- 利点</br>
Stateは状態変更の条件としてのif文を減らすことで，後に状態の追加などのメンテナンスをしやすくしている．
- 適用に適したシーン</br>
Stateはそれぞれの事象が同時に起きない時に使用される．
- サンプルコード</br>
patterns/5_state.js

### 6. Storategy - ロジックの差し替え - [State]
___
- 構造</br>
今回はコンストラクタをstrategyに指定し，二つの別のロジックを組み込んだ．
Decoretorは上から被さるものが変わり，中心は一緒．Storategyは被さるものは一緒で，中身が変わる．
```
// シリアライズ=直列化と言います．
// バイナリ（今は文字列と考えても良いです）で保存可能な形に加工するような意味合いです．
class Serializer {
  #strategy
  constructor(strategy) {
    // 与えられたstrategyを動作の詳細とします
    this.#strategy = strategy;
  }

  serialize(object) {
    return this.#strategy.serialize(object);
  }
}

class Strategy1 {
  serialize(object) {}
}
class Strategy2 {
  serialize(object) {}
}
let serializer1 = new Serializer(new Strategy1);
serializer1.serialize();
let serializer2 = new Serializer(new Strategy2);
serializer2.serialize();
```
- 利点</br>
Strategyはアルゴリズムと部品を分けることでif文を減らしている．</br>
アルゴリズムを分けることでアルゴリズムの追加，変更，メンテナンスが容易になる．</br>
**ロジックの差し替えを容易になる．**
- 適用に適したシーン</br>
それぞれの事象のロジックが違う物で同時に生じる可能性のある時に使用される．</br>
Strategyは出力の変更を容易にするために，ロジックを外に出しメンテナンスを容易にした．
- サンプルコード</br>
patterns/6_strategy.js

### 7. Adapter - 相手にインターフェースを合わせる - [Decrator, Strategy]
___
- 構造</br>
Adapterは間に互換性のあるクラスを挟むことで，</br>
当てはめたいクラス（Clock,TimeByString）ロジックを元のクラス（MessageCreator）に利用できる形に変換する．
```
// 今回は固定メソッドからbooleanを取る形
class 変えてはいけないクラス1 {
  method(adapter) {
    if(adapter.method1) {}
    else if(adapter.method2) {}
    else {}
  }
}
// Dateを返す形
class 変えてはいけないクラス2 {
  method() {
    return Date;
  }
}
class Adapter {
  #date
  constructor(date) {
    this.#date = date;
  }

  method1() {
    // this.#dateを使って何か評価をする
    return boolean
  }
  method2() {
    // this.#dateを使って何か評価をする
    return boolean
  }
}

let 変えてはいけないクラス1のインスタンス = new 変えてはいけないクラス1;
let 変えてはいけないクラス2のインスタンス = new 変えてはいけないクラス2;
let adapter = new Adapter(変えてはいけないクラス2のインスタンス);
変えてはいけないクラス1のインスタンス.method(adapter);
```
- 利点</br>
二つのクラスが変更不可の時に間に挟むことでつじつま合わせができる．
- 適用に適したシーン</br>
出力側のデータ構造に合わせる為に使用．
基本アルゴリズムは同じだがデータなど元が違う時．
- サンプルコード</br>
patterns/7_adapter.js

### 8. Facade - 細かい事をまるっと隠す- [Decorator]
___
- 構造</br>
機能を一ヶ所でまとめる．そこだけの使い方がわかれば中身は知らなくて良い．
```
class Facade {
  #出力先クラス
  constructor() {
    this.#出力先クラス = new 出力先クラス;
  }

  method1(引数) {
    let 何か1のインスタンス = new 何か1(引数);
    let 何か2のインスタンス = new 何か2(何か1のインスタンス);
    this.#出力先クラス.何かmethod1(何か2のインスタンス);
  }
  method2() {
    let 何か3のインスタンス = new 何か3;
    this.#出力先クラス.何かmethod3(何か3のインスタンス);
  }
}
let facade = new Facade();
facade.method1(引数);
facade.method2();
```
- 利点</br>
詳しいアルゴリズムがわからなくても，一番外のモジュールの使用方法がわかればよくなる．
- 適用に適したシーン</br>
多くのクラスを利用して，階層が深く，</br>
それぞれのロジックが単純でも全体としてどんな動きをするのかが把握しづらくなってきた時．
- サンプルコード</br>
patterns/8_facade.js

### 9. Composite
___
- 構造</br>

```
```
- 利点</br>

- 適用に適したシーン</br>

- サンプルコード</br>
patterns/


## 専門用語
- カプセル化
- 継承
- コンポジション
- ポリモーフィズム