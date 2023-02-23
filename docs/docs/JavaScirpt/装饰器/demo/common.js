// 在common.ts中
import "Reflect-metadata";
// 建立@Controller装饰器函数
function Controller(path) {
    return function (constructor) {
        Reflect.defineMetadata('path', '/' + path, constructor);
    };
}
// 一个工厂函数，根据传入的请求方法类型来返回一个该类型的装饰器工厂函数
function createMethodsDecorator(method) {
    return function (routeName) {
        return function (target, propertyName, descriptor) {
            // @Get之类的装饰器会装饰实例方法。因此，为该实例方法设定元数据route路由路径和method请求方法
            Reflect.defineMetadata("route", '/' + routeName, target, propertyName);
            Reflect.defineMetadata("method", method, target, propertyName);
        };
    };
}
// 路径信息解析函数，传入的参数为控制器类，返回该控制器的所有路由信息
function mapRoute(constructor) {
    // 得到控制器路径，即@Controller()中的参数值
    const pathName = Reflect.getMetadata("path", constructor);
    const routes = [];
    const proto = constructor.prototype;
    // 过滤掉类的原型中不是函数的属性
    const funcs = Object.keys(proto).filter(item => (typeof proto[item] === 'function'));
    funcs.forEach(funcName => {
        // 得到@Get()中的参数值
        let route = Reflect.getMetadata("route", proto, funcName);
        route = pathName + route;
        // 得到为该方法设定的允许请求方法
        const method = Reflect.getMetadata("method", proto, funcName);
        const fn = proto[funcName];
        const routeMes = {
            route,
            method,
            fn,
            methodName: funcName
        };
        routes.push(routeMes);
    });
    return {
        pathName,
        routes
    };
}
// 通过上述工厂函数得到装饰器工厂函数
const Get = createMethodsDecorator('GET');
const Post = createMethodsDecorator('POST');
export { Controller, Get, Post, mapRoute };
