let {
    SyncWaterfallHook
} = require('tapable');
let factoryHook = new SyncWaterfallHook(["factory"]);

factoryHook.tap('1', function (factory) {
    return function () {
        console.log(1);
        factory();
    }
});
factoryHook.tap('2', function (factory) {
    return function () {
        console.log(2);
        factory();
    }
});
factoryHook.tap('3', function (factory) {
    return function () {
        console.log(3);
        factory();
    }
});
let newFactory = factoryHook.call(() => {
    console.log('我是最初的工厂方法')
});
newFactory();