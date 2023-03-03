

# eventbus

> 使用了一下这种方式，觉得蛮不错的，记一下。

```js
import Vue from 'vue';
const eventbus = new Vue();
export default eventbus;

// 事件常量化
export const EVENTBUS_TYPE = {

};

/**
 *
 * @param {string} type 监听的事件type
 * @param {(res) => void } handler 监听挂载的处理方法
 * @returns a mixin
 */
export const eventBusMixin = function (type, handler) {
  return {
    mounted() {
      eventbus.$on(type, (...args) => handler.call(this, ...args));
    },
    destroyed() {
      eventbus.$off(type);
    },
  };
};



```