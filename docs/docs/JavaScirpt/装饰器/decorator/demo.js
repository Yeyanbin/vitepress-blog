var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 类装饰器
function ClassDecorator(constructor) {
    console.log('类装饰器 done');
}
// 方法装饰器
function FunctionDecorator(target, propertyKey, descriptor) {
    console.log('方法装饰器 done');
}
// 属性装饰器
function PropertDecorator(target, propertyKey) {
    console.log('属性装饰器 done');
}
// 参数装饰器
function ParamsDecorator(target, propertyKey, parameterIndex) {
    console.log('参数装饰器 done');
}
var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.prototype.func = function (paramA) { };
    __decorate([
        PropertDecorator
    ], Demo.prototype, "Propert");
    __decorate([
        FunctionDecorator,
        __param(0, ParamsDecorator)
    ], Demo.prototype, "func");
    Demo = __decorate([
        ClassDecorator
    ], Demo);
    return Demo;
}());
/*
执行顺序：

属性装饰器 done
参数装饰器 done
方法装饰器 done
类装饰器 done
*/ 
