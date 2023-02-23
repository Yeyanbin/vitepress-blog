// 在cats.controller.ts中
// import { Controller, Get, Post } from "./common";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// @Controller("cats")
// export class CatsController {
//   @Get("findAll")
//   findAll(): string {
//     return "Find all";
//   }
//   @Get("findOne")
//   findOne(): string {
//     return "Find one";
//   }
//   @Post("create")
//   create(): string {
//     return "Create succeed";
//   }
// }
const Metadata = {};
const addMetadata = (key, value) => {
    if (Metadata[key]) {
        Metadata[key].push(value);
    }
    else {
        Metadata[key] = [value];
    }
};
const getMetadata = (key) => Metadata[key];
const Zoo = (family) => {
    return (constructor) => {
        return ((name) => {
            addMetadata(family, name);
            constructor(name);
        });
    };
};
const Count = () => {
    let _count = 0;
    return function (target, propertyKey, descriptor) {
        const originFunc = target[propertyKey];
        target[propertyKey] = (...args) => {
            ++_count;
            return originFunc(...args);
        };
        target[propertyKey].valueOf = () => {
            return _count;
        };
    };
};
const log = function (target, propertyKey, descriptor) {
    const originFunc = target[propertyKey];
    target[propertyKey] = (...args) => {
        const result = originFunc(...args);
        console.log(result);
        return result;
    };
};
class Animal {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return `${this.name}叫了`;
    }
}
let Cat = class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    greet() {
        return `${this.name}，喵喵喵`;
    }
};
__decorate([
    log,
    Count()
], Cat.prototype, "greet", null);
Cat = __decorate([
    Zoo('猫科')
], Cat);
let Dog = class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    greet() {
        return `${this.name}，汪汪汪`;
    }
};
__decorate([
    log,
    Count()
], Dog.prototype, "greet", null);
Dog = __decorate([
    Zoo('犬科')
], Dog);
const cat_1 = new Cat('小红');
const cat_2 = new Cat('小明');
const cat_3 = new Cat('小张');
const cat_4 = new Cat('小亮');
const dog_1 = new Dog('张三');
const dog_2 = new Dog('李四');
const dog_3 = new Dog('王五');
dog_1.greet();
dog_1.greet();
dog_1.greet();
dog_2.greet();
dog_2.greet();
console.log(`${dog_1.name}叫了${dog_1.greet}次`);
console.log(`${dog_2.name}叫了${+dog_2.greet}次`);
