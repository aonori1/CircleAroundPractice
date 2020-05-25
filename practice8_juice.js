// - 街頭にあるジュースの自動販売機のような概念をクラスにしましょう。
//     - 商品（Item）を複数入れる事ができます。
//         - ex. 商品名: コカコーラ、価格120円 のような商品名と価格があるのがItemの要素です。
//         - 同じ商品名で値段が違うことは無いものとします。

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getName() {
    return this.name;
  }
  setName(item){
    this.name = item;
  }
  getPrice() {
    return this.price;
  }
  setPrice(item) {
    this.price = item;
  }
}

//     - 販売機（VendingMachine）には以下の機能があります。
//         - 商品の補充（コーラ3本、オレンジ2本など、補充できます）
//         - 商品の購入
//             - 以下のように buy メソッドで商品を一つ購入できます。
//             - buy(productName, cash) - 戻り値は購入された Item です。
//             - 今はお釣りの概念は無いものとします。cashが商品の価格以上であれば買えます。
//         - 商品の在庫確認（今その商品が買えるのかのチェック）
//             - canBuy(productName): boolean
//         - 異常系
//             - 商品の購入時、cachがItemの価格を下回る場合には例外を投げてください。
//             - 商品の購入時、在庫が0件であれば例外を投げてください。
class VendingMachine {
  constructor() {
    this.items = [];
    this.stocks = [];
  }

  addItem(item) {
    this.items.push(item);
    return item.getName();
  }
  addStock(name, stock) {
    // 全部回すのはまずい
    this.stocks.map(x => {
      if(x.name === name) {
        x.stock += stock;
        return `${x.name}を${stock}本追加しました`;
      }
      return;
    })
    this.stocks.push(this.createJSON(name, stock));
    return `${name}を新しく${stock}本追加しました`;
  }
  buy(productName, cash) {
    console.log(`${productName} ${cash}`);
    if (this.canBuy(productName)) {
      // 全部回すのはまずい
      this.items.map(x =>{
        if(x.getName() === productName && x.getPrice() <= cash) {
          i.stock -= 1;
          return `${x.getName()}を買いました`;
        } else if(x.getName() === productName && x.getPrice() > cash) {
          return `お金が${x.getPrice()-cash}円足りません`;
        }
      })
    } else {
        return `${productName}は在庫切れです`;
    }
  }
  // 全部回すのはまずい
  canBuy(productName) {
    this.stocks.map(x => {
      if(x.name === productName && x.stock !== 0) {
        return true;
      }
      return false;
    })
  }
  createJSON(name, stock) {
    return {name: name, stock: stock};
  }
}

vendingMachine = new VendingMachine;

console.log(`${vendingMachine.addItem(new Item("コーラ", 120))}を追加しました`);
console.log(`${vendingMachine.addItem(new Item("ソーダ", 130))}を追加しました`);
console.log(`${vendingMachine.addItem(new Item("オレンジジュース", 140))}を追加しました`);
console.log(`${vendingMachine.addItem(new Item("リンゴジュース", 150))}を追加しました`);

console.log(vendingMachine.addStock("コーラ", 10));
console.log(vendingMachine.addStock("ソーダ", 10));
console.log(vendingMachine.addStock("オレンジジュース", 1));
console.log(vendingMachine.addStock("オレンジジュース", 1));
console.log(vendingMachine.addStock("リンゴジュース", 1));

console.log(vendingMachine.buy("コーラ", 200));
console.log(vendingMachine.buy("コーラ", 200));
console.log(vendingMachine.buy("コーラ", 100));
console.log(vendingMachine.buy("リンゴジュース", 200));
console.log(vendingMachine.buy("リンゴジュース", 150));

if (vendingMachine.canBuy("コーラ")) {
  console.log('コーラは買えます');
} else {
  console.log('コーラは買えません')
}
if (vendingMachine.canBuy("ソーダ")) {
  console.log('ソーダは買えます');
} else {
  console.log('ソーダは買えません')
}
if (vendingMachine.canBuy("オレンジジュース")) {
  console.log('オレンジジュースは買えます');
} else {
  console.log('オレンジジュースは買えません')
}
if (vendingMachine.canBuy("リンゴジュース")) {
  console.log('リンゴジュースは買えます');
} else {
  console.log('リンゴジュースは買えません')
}
if (vendingMachine.canBuy("お茶")) {
  console.log('お茶は買えます');
} else {
  console.log('お茶は買えません')
}
