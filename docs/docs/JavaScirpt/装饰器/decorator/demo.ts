
// 类装饰器
function ClassDecorator(constructor: Function) {
  console.log('类装饰器 done');
}

// 方法装饰器
function FunctionDecorator(target, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('方法装饰器 done');

}

// 属性装饰器
function PropertDecorator(target: any, propertyKey: string) {
  console.log('属性装饰器 done');

}

// 参数装饰器
function ParamsDecorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log('参数装饰器 done');

}

@ClassDecorator
class Demo {
  @PropertDecorator
  Propert: any;

  @FunctionDecorator
  func(@ParamsDecorator paramA) {}
}

/*
执行顺序：

属性装饰器 done
参数装饰器 done
方法装饰器 done
类装饰器 done
*/