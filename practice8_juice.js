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
    for(let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].name === name) {
        this.stocks[i].stock += stock;
        return `${this.stocks[i].name}を${stock}本追加しました`;
      } else {
        this.stocks.push(this.createJSON(name, stock));
        return `${name}を新しく${stock}本追加しました`;
      }
    }
  }

  buy(productName, cash) {
    if (this.canBuy(productName)) {
      for(let i = 0; i < this.items.length; i++) {
        if (this.items[i].getName() === productName && this.items[i].getPrice() <= cash ) {
          for(let i = 0; i < this.stocks.length; i++) {
            this.stocks[i].stock -= 1;
            return `${this.items[i].getName()}を買いました`;
          }
        } else if(this.items[i].getName() === productName && this.items[i].getPrice() > cash) {
          return `お金が${this.items[i].getPrice()-cash}円足りません`;
        }
      }
    } else {
      return `${productName}は在庫切れです`;
    }
  }

  canBuy(productName) {
    for(let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].name === productName && this.stocks[i].stock !== 0 ) return true;
    }
    return false;
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
