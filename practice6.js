
// 本の情報を扱うクラス
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
    // 自分自身（this）のcanAddBookメソッドを呼び出す
    if (!this.canAddBook(book)) return false;

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

  // 今この本を追加できますか？」というチェックを行えるメソッド
  canAddBook(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }
}

// // 格納できる本の数が指定できる本棚クラス
// class LimitedBookshelf extends Bookshelf {
//   constructor(maxSize = 3) {
//     super(); // 親のconstructorを呼びます
//     this.maxSize = maxSize;
//   }

//   // 親クラスが作っているメソッドを上書き（オーバーライド）できます。
//   canAddBook(book) {
//     return this.books.length < this.maxSize;
//   }
// }

class RentalBookshelf extends Bookshelf {
  constructor() {
    super();
    this.rentedBooks = [];
  }

  // 指定の本を借りる
  rentalBook(title) {
    if(books.some(b => b.title === title)) {
      this.rentedBooks.push(title);
    console.log(`${title}を借りました`);
    return true;
    } else {
      console.log(`${title}は見つかりませんでした`);
    }
  }

  // 指定の本を返す
  returnBook(title) {
    if(this.rentedBooks.includes(title)) {
      this.rentedBooks = this.rentedBooks.filter(x => x !== title);
      console.log(`${title}を返しました`);
    } else {console.log(`${title}は借りていません`);}
  }

  // 貸し出されている本の一覧を取得する
  listRentedBooks() {
    console.log(this.rentedBooks);
  }

  // 指定の本が貸出中か調べる。貸出中なら真。さもなくば疑。
  isRented(title) {
    if(this.rentedBooks.includes(title)) {
      console.log(`${title}は貸出中です`);
    } else {console.log(`${title}は借りられます`);}
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

bookshelf.rentalBook("x");
bookshelf.rentalBook("a");
bookshelf.rentalBook("z");
bookshelf.listRentedBooks();
bookshelf.isRented("x");
bookshelf.isRented("y");
bookshelf.returnBook("x");
bookshelf.returnBook("y");
bookshelf.isRented("x");
bookshelf.listRentedBooks();