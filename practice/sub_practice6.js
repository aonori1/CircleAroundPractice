class Book {
  // 初期化時に使われるコンストラクタ
  constructor(title, pageSize) {
    this.title = title;
    this.pageSize = pageSize;
  }

  // 以下はクラス内の情報（プロパティや属性と呼ばれる）の操作

  // titleのゲッター
  getTitle() {
    return this.title;
  }

  // titleのセッター
  setTitle(value) {
    this.title = value;
  }

  // pageSizeのゲッター
  getPageSize() {
    return this.pageSize;
  }

  // pageSizeのセッター
  setPageSize(value) {
    this.pageSize = value;
  }
}


// 本棚として本を格納するクラスの基底クラス
class Bookshelf {
  // 指定したハッシュの配列から初期の本棚を作り出す
  static valueOf(arrayOfHash) {
    // thisの型に関連している new が呼ばれます。
    // 今回のサンプルではnew LimitedBookshelfが呼ばれます。
    let bookshelf = new this;

    for (let i = 0; i < arrayOfHash.length; i++) {
      let hash = arrayOfHash[i];
      let book = new Book(hash.title, hash.pageSize);
      bookshelf.addBook(book);
    }
    return bookshelf;
  }

  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    return true;
  }

  findBookByTitle(title) {
    for(let i = 0; i < this.books.length; i++) {
      if (this.books[i].getTitle() === title) return this.books[i];
    }
    return null;
  }

  sumPageSize() {
    let size = 0;
    for(let i = 0; i < this.books.length; i++) {
      size += this.books[i].getPageSize();
    }
    return size;
  }

  size() {
    return this.books.length;
  }
}

class RentalBookshelf extends Bookshelf {
  constructor() {
    super();
    this.rentedBooks = [];
  }

  // 指定の本を借りる
  rentalBook(book) {
    for(let i = 0; i < this.rentedBooks.length; i++) {
      if (this.rentedBooks[i] === book) return false;
    }
    this.rentedBooks.push(book);
    return true;
  }

  // 指定の本を返す
  returnBook(book) {
    for(let i = 0; i < this.rentedBooks.length; i++) {
      if (this.rentedBooks[i] === book) {
        this.rentedBooks = this.rentedBooks
        .filter(x => x !== book);
        return true;
      };
    }
    return false;
  }

  // 貸し出されている本の一覧を取得する
  listRentedBooks() {
    return this.rentedBooks;
  }

  // 指定の本が貸出中か調べる。貸出中なら真。さもなくば疑。
  isRented(book) {
    for(let i = 0; i < this.rentedBooks.length; i++) {
      if (this.rentedBooks[i] === book) return true;
    }
    return false;
  }
}


let books = [
  { title: "坊ちゃん", pageSize: 520 },
  { title: "我輩は猫である", pageSize: 454 },
  { title: "こころ", pageSize: 876 },
  { title: "x", pageSize: 876 },
  { title: "y", pageSize: 876 },
  { title: "z", pageSize: 876 }
];

let bookshelf = RentalBookshelf.valueOf(books);

let bocchan = bookshelf.findBookByTitle('坊ちゃん');
if(!bookshelf.isRented(bocchan)) {
  console.log('坊ちゃんは借りられます');
} else {
  throw new Error('坊ちゃんは借りられるはずです')
}

if(bookshelf.rentalBook(bocchan)) {
  console.log('坊ちゃんを借りました');
} else {
  throw new Error('坊ちゃんを借りるのに失敗しました')
}

console.log('貸し出し中は坊ちゃんだけのはずです')
console.log(bookshelf.listRentedBooks());

if(bookshelf.isRented(bocchan)) {
  console.log('坊ちゃんは借りられません');
} else {
  throw new Error('坊ちゃんが借りられないはずです')
}

if (bookshelf.returnBook(bocchan)) {
  console.log('坊ちゃんを返却しました')
}

console.log('坊ちゃんを返したので貸し出し中は一冊も無いはずです')
console.log(bookshelf.listRentedBooks());