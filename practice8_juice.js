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

class VendingMachine {
  constructor() {
    this.items = [];
    this.stocks = [];
  }

  addItem(item) {
    this.items.push(item);
    return true;
  }

  addStock(name, stock) {
    for(let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].name === name) {
        this.stocks[i].stock += stock;
        return true;
      }
    }
    this.stocks.push(this.createJSON(name, stock));
    return true;
  }

  buy(productName, cash) {
    if (this.canBuy(productName)) {
      for(let i = 0; i < this.items.length; i++) {
        if (this.items[i].getName() === productName && this.items[i].getPrice() <= cash ) {
          for(let s = 0; s < this.stocks.length; s++) {
            if(this.stocks[s].name === productName) {
              this.stocks[s].stock -= 1;
              return true;
            }
          }
        } else if(this.items[i].getName() === productName && this.items[i].getPrice() > cash) {
          let shortage = this.items[i].getPrice()-cash;
          return shortage;
        }
      }
    } else {
      return null;
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

class DebugVendingMachine extends VendingMachine {
  addItem(item) {
    console.debug(`addItem(name:${item.getName()} , price:${item.getPrice()})`);
    console.debug(`addItem(${super.addItem(item)})`);
  }
  addStock(name, stock) {
    console.debug(`addItem(name:${name} , price:${stock})`);
    console.debug(`addItem(${super.addStock(name, stock)})`);
  }

  buy(productName, cash) {
    let buy = super.buy(productName, cash);
    if(buy === true) {
      console.debug(`buy(productName:${productName} , cash:${cash})`);
      console.debug(`買えました:${buy}`);
    } else if(buy === null) {
      console.debug(`${productName}は在庫切れです`);
    } else {
      console.debug(`お金が${buy}円足りません`);
    }
  }

  canBuy(productName) {
    let canBuy = super.canBuy(productName);
    console.debug(`canBuy(${productName})`);
    console.debug(`canBuy(productName):${canBuy}`);
    return canBuy;
  }
}

function debugVendingMachine() {
  if(process.env.NODE_ENV == 'development') {
    return new DebugVendingMachine;
  } else {
    return new VendingMachine;
  }
}

vendingMachine = debugVendingMachine();

vendingMachine.addItem(new Item("コーラ", 120));
vendingMachine.addItem(new Item("ソーダ", 130));
vendingMachine.addItem(new Item("オレンジジュース", 140));
vendingMachine.addItem(new Item("リンゴジュース", 150));

vendingMachine.addStock("コーラ", 10);
vendingMachine.addStock("ソーダ", 10);
vendingMachine.addStock("オレンジジュース", 1);
vendingMachine.addStock("オレンジジュース", 1);
vendingMachine.addStock("リンゴジュース", 1);

vendingMachine.buy("コーラ", 200);
vendingMachine.buy("コーラ", 100);
vendingMachine.buy("リンゴジュース", 200);
vendingMachine.buy("リンゴジュース", 150);

if (vendingMachine.canBuy("コーラ")) {
  console.log('コーラは買えます');
} else {
  console.log('コーラは買えません');
}
if (vendingMachine.canBuy("ソーダ")) {
  console.log('ソーダは買えます');
} else {
  console.log('ソーダは買えません');
}
if (vendingMachine.canBuy("オレンジジュース")) {
  console.log('オレンジジュースは買えます');
} else {
  console.log('オレンジジュースは買えません');
}
if (vendingMachine.canBuy("リンゴジュース")) {
  console.log('リンゴジュースは買えます');
} else {
  console.log('リンゴジュースは買えません');
}
if (vendingMachine.canBuy("お茶")) {
  console.log('お茶は買えます');
} else {
  console.log('お茶は買えません');
}
