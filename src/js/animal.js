// JS comment Animal
class Animal {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  say() {
    console.log("Say, ", this.a, this.b);
  }
}

let c = new Animal("asd", "bbb");
c.say();
