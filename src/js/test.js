// JS comment
class Test {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  say() {
    console.log("Say, ", this.a, this.b);
  }
}

let t = new Test("asd", "bbb");
t.say();
