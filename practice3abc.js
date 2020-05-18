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

// 「追加を拒否した回数」を取得するメソッド
class LimitedCountBookshelf {
  constructor(count = 0) {
    this.count = count;
  }

  getLimitedCount() {
    return `${this.count}回追加に失敗しました`;
  }
}

// 本棚として本を格納するクラスの基底クラス
class Bookshelf extends LimitedCountBookshelf {
  constructor() {
    super();
    this.books = [];
  }

  addBook(book) {
    // 自分自身（this）のcanAddBookSizeメソッドとcanAddBookNameメソッドとcanAddBookThinメソッドを呼び出す
    if (!this.canAddBookSize(book) || !this.canAddBookName(book) || !this.canAddBookThin(book)) {
      this.count += 1;
      return false
    }

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

  // 三冊以上なら追加できないメソッド
  canAddBookSize(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }
  // 「坊ちゃん」なら追加できないメソッド
  canAddBookName(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }
  // 20ページ以上なら追加できないメソッド
  canAddBookThin(book) {
    return true; // デフォルトでは何も制限を行わないのでどんな時も本を追加できる
  }
}

// “坊ちゃん“を追加する事ができない本棚クラス
class RejectedBocchanBookshelf extends Bookshelf  {
  constructor(bookTitle = "坊ちゃん") {
    super();
    this.cannotAddBookTitle = bookTitle;
  }

  canAddBookName(book) {
    return book.title !== this.cannotAddBookTitle;
  }
}

//20ページ未満の本しか追加する事ができない本棚クラス
class ThinBookshelf extends RejectedBocchanBookshelf  {
  constructor(Thin = 20) {
    super();
    this.cannotAddBookThin = Thin;
  }

  canAddBookThin(book) {
    return book.pageSize < this.cannotAddBookThin;
  }
}

// 格納できる本の数が指定できる本棚クラス
class LimitedBookshelf extends ThinBookshelf {
  constructor(maxSize = 3, count = 0) {
    super(); // 親のconstructorを呼びます
    this.maxSize = maxSize;
    this.count = count;
  }

  canAddBookSize(book) {
    return this.books.length < this.maxSize;
  }
}

let bookshelf = new LimitedBookshelf;

bookshelf.addBook(new Book("坊ちゃん", 19));
bookshelf.addBook(new Book("我輩は猫である", 19));
bookshelf.addBook(new Book("こころ", 15));
bookshelf.addBook(new Book("x", 25));
bookshelf.addBook(new Book("y", 3));
bookshelf.addBook(new Book("z", 17));

console.log(bookshelf.findBookByTitle("坊ちゃん"));
console.log(bookshelf.findBookByTitle("我輩は猫である"));
console.log(bookshelf.findBookByTitle("こころ"));
console.log(bookshelf.findBookByTitle("x"));
console.log(bookshelf.findBookByTitle("y"));
console.log(bookshelf.findBookByTitle("z"));
console.log(bookshelf.size());
console.log(bookshelf.sumPageSize());
console.log(bookshelf.getLimitedCount())