
const zooArea = {};
const addAnimal = (key, value) => {
  if (zooArea[key]) {
    zooArea[key].push(value);
  } else {
    zooArea[key] = [value];
  }
};
const getArea = (key) => zooArea[key];

const Zoo = ({
  family,
  desc,
}) => {
  return (constructor: Function) => {
    console.log('Zoo doing!')
    return function (name: string) {
      addAnimal(family, { desc, name });
      return new (constructor as any)(name);
    } as any
  }
};
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

@Zoo({
  family: '猫科',
  desc: '只是普通的小猫咪，偶尔抓只小鸟或老鼠'
})
class Cat extends Animal{
  constructor(name: string) {
    super(name);
  }
}

@Zoo({
  family: '犬科',
  desc: '这是一只可爱的小狗，但是大多数人来动物园都不是为了看它'
})
class Dog extends Animal{
  constructor(name: string) {
    super(name);
  }
}

@Zoo({
  family: '猫科',
  desc: '老虎是动物园里面最受小朋友欢迎的之一'
})
class Tiger extends Animal{
  constructor(name: string) {
    super(name);
  }
}

const cat_1 = new Cat('小红');
const cat_2 = new Cat('小明');
const cat_3 = new Cat('小张');
const cat_4 = new Cat('小亮');

const dog_1 = new Dog('张三');
const dog_2 = new Dog('李四');
const dog_3 = new Dog('王五');

const tiger_1 = new Tiger('甲');
const tiger_2 = new Tiger('乙');
const tiger_3 = new Tiger('丙');
const tiger_4 = new Tiger('丁');

console.log(zooArea)