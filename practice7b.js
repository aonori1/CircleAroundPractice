class PointCalculator {
  #results
  constructor(results) {
    this.#results = results;
  }

  addResults(name, point) {
    this.#results.push(this.toJSON(name, point));
  }

  sumPoint() {
    let sumPoint = 0;
    this.#results.forEach(value => {
      sumPoint += value.point;
    });
    return sumPoint;
  }

  avePoint() {
    let sumPoint = 0;
    let avePoint = 0;
    this.#results.forEach(value => {
      sumPoint += value.point;
    });
    avePoint =  sumPoint / this.#results.length;
    return avePoint;
  }

  findBest() {
    let bestPoint = 0;
    let name = "";
    this.#results.forEach(value => {
      if(bestPoint < value.point) {
        bestPoint = value.point;
        name = value.name;
      }
    });
    return name;
  }

  // JSON.stringifyする時に下記のJSONが使われます
  toJSON(name, point) {
    return { name: name, point: point };
  }
}

let results = [
  {name: '鈴木', point: 80},
  {name: '田中', point: 92},
  {name: '佐藤', point: 75}
];

let pointCalculator = new PointCalculator(results);

console.log(`合計点は${pointCalculator.sumPoint()}点です`);
console.log(`平均点は${pointCalculator.avePoint()}点です`);
console.log(`最高得点の人は${pointCalculator.findBest()}です`);
pointCalculator.addResults("阿部", 95);
console.log(`合計点は${pointCalculator.sumPoint()}点です`);
console.log(`平均点は${pointCalculator.avePoint()}点です`);
console.log(`最高得点の人は${pointCalculator.findBest()}です`);
