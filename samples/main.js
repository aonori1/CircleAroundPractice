// 最後全機能をまとめ出力
class Main {

}

class Comand {
  constructor(tags, comand, description) {
    this.tags = tags;
    this.comand = comand;
    this.description = description;
  }

  getTags() {
    return this.tags;
  }
  setTags(value) {
    this.tags = value;
  }

  getComand() {
    return this.comand;
  }
  setComand(value) {
    this.comand = value;
  }

  getDescription() {
    return this.description;
  }
  setDescription(value) {
    this.description = value;
  }
}

// 全コマンドを格納
class Kinds {
  #comands
  static valueOf(arrayOfHash) {
    let kinds = new this;

    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let comand = new Comand(hash.tags, hash.comand, hash.description);
      kinds.addComand(comand);
    }
    return kinds;
  }

  constructor() {
    this.#comands = [];
  }
  addComand(comand) {
    this.#comands.push(comand);
    return true;
  }
  allComands() {
    return this.#comands;
  }
}

// tagsの中から検索し判別しcomandをKindsのcomandsから探す
class FindComandByTags {
  #comands
  constructor(kinds) {
    this.kinds = kinds;
    this.#comands = []
  }

  findComandByTags(word) {
    let comandsArray = this.kinds.allComands();
    this.#comands .push(comandsArray.map(x => {
      if(x.tags.includes(word)) {
        return x;
      }
      return;
    }));
    console.log(this.#comands);
  }
}

// 探ている
class FindComandByTag {

}



let comands = [
  {
    tags: ['ブランチ', '取得'],
    comand: ['git branch --contains=HEAD', 'git branch --contains'],
    description: '1の branch コマンドの contains オプションは、指定したコミットを含むブランチのみを表示します。なので、2の様に指定しないとデフォルトで HEAD が指定されます。'
  },
  {
    tags: ['カレント', 'ブランチ', 'ローカル', '確認', '今の'],
    comand: ['git branch'],
    description: 'ローカルのカレントブランチを表示します．'
  },
  {
    tags: ['新しく', 'ブランチ', '作成', '移動'],
    comand: ['git checkout -b (branch_name)'],
    description: '新しくブランチを作成しそのブランチに移動します．'
  },
];

let kinds = Kinds.valueOf(comands);
let find = new FindComandByTags(kinds);
find.findComandByTags('ブランチ');

