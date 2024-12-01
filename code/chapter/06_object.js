function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
var whiteRabbit = {type: "white", speak};
var hungryRabbit = {type: "hungry", speak};


var protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
var blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";

var Rabbit = class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

var killerRabbit = new Rabbit("killer");

Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

var Temperature = class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}


var length = Symbol("length");

var List = class List {
  constructor(value, rest) {
    this.value = value;
    this.rest = rest;
  }

  get length() {
    return 1 + (this.rest ? this.rest.length : 0);
  }

  static fromArray(array) {
    let result = null;
    for (let i = array.length - 1; i >= 0; i--) {
      result = new this(array[i], result);
    }
    return result;
  }
}

var ListIterator = class ListIterator {
  constructor(list) {
    this.list = list;
  }

  next() {
    if (this.list == null) {
      return {done: true};
    }
    let value = this.list.value;
    this.list = this.list.rest;
    return {value, done: false};
  }
}

List.prototype[Symbol.iterator] = function() {
  return new ListIterator(this);
};

var LengthList = class LengthList extends List {
  #length;

  constructor(value, rest) {
    super(value, rest);
    this.#length = super.length;
  }

  get length() {
    return this.#length;
  }
}
