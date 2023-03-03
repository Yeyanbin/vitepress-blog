### 目录
- [Vuex是什么](#Vuex是什么)
- [Vuex的使用](#Vuex的使用)
- [Vuex的规范](#Vuex的规范)
- [目前Vuex带来的问题](#目前Vuex带来的问题)

## Vuex是什么
Vuex是一个状态管理模式，他提供了一些规则让状态以一种可预测的方式发生变化。

它是一个全局单例模式管理，在这种模式下，我们的组件树的任何位置都可以获取状态，其通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，使代码变得更结构化且易维护的。


- 有以下几个概念
  - state —— 被管理的状态
  - getters —— 我们需要暴露一些状态出去给views层
  - mutations —— 变更状态的唯一方法，通过在actions中commit，他必须是同步的。
  - actions —— views层或者说组件层提交 (dispatch)，而不是直接变更state
  - modules —— 细分store
  
> 加一些文档上没有的
> - store —— 状态管理工具本身
> - dispatch —— 组件使用actions的方法
> - commit —— 提交mutaions去修改state

  

#### Vuex要解决什么问题


Vuex要解决的核心问题是：**多个组件共享状态**时，**单向数据流**的简洁性会被破坏。
下图就是一个简单的单向数据流示意图。
![](https://vuex.vuejs.org/flow.png)

> 多个组件共享状态的例子：
>   1. 多个组件依赖于用户是否登录的状态，从而渲染不同的内容。
>   2. 当用户登录的时候，从而改变不同组件所依赖的状态。

多个组件共享状态使用其他的组件通讯方法也是可以的，例如eventBus, props, inject/provide之类的。但是相对于以上方法，使用状态管理工具（例如vuex, redux等）把状态统一进行管理会更加简洁和方便，实际上这也是为什么解决了 **“单向数据流的简洁性被破坏”**。

#### 但是，为什么我们要选择vuex呢？

> 在大多数时候，我们只需要一种简易的状态管理工具即可。这里在Vue文档中有提到过简单的[状态管理](https://cn.vuejs.org/v2/guide/state-management.html#%E7%B1%BB-Flux-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E7%9A%84%E5%AE%98%E6%96%B9%E5%AE%9E%E7%8E%B0)

Vuex借鉴了Flux、Redux和 The Elm Architecture的思想（别的状态管理工具），是专门为了Vue设计的，以利用Vue的细粒度数据响应机制来进行高效的状态更新。

`PS: 这里所说的“细粒度”是原文，我也不太能解释什么，这可能就是所谓的懂得都懂。（我猜大概是在自夸Vue的数据响应机制可以进行较为精细的数据响应`

个人观点，Vuex给我们带来了很多冗余的开发体验，对于Vue开发者来说，某种程度上，这便是徒增学习成本而已。所以，我们需要谨慎的选择Vuex，在非大型单页应用中，可以仅仅选择一个简单的状态管理模式。但是我们也必须了解Vuex的目的，从而在需要它的时候，去选择它。




#### Vuex的目的

把所有组件的状态集中存储并管理起来，使状态以一种**可预测的方式**发生变化，以便于在组件共享状态时，维护单向数据流的简洁性。

> 个人对这种 “可预测的方式” 的一些理解与总结
>   1. 状态state通过getters进行获取，并拒绝直接在组件修改state
>   2. 组件层需要通过分发Actions（dispatch），再分发Mutations（commit），达到修改state的目的。
>   3. 在dispatch Actions的时候考虑组件交互是并不被推荐的行为，actions和mutations里应该只为该module的state所服务。




## Vuex的使用


##### 组件获取state

Vuex希望我们在store中定义 `getter`，像计算属性的方式，将getter的返回值根据它的依赖缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// 上面的stote会将getters暴露为 store.getters 对象，可以以访问属性的形式访问这些值
store.getters.doneTodos // [ { id: 1, text: '...', done: true } ]
```

在别的组件使用 `挂载到$store上`

```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

几种getter的使用方法
```
// 通过属性访问
getters: {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
  // 第二个参数可以是 getters
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
  // 通过方法访问
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

// 组件中
store.getters.doneTodos; // -> [{ id: 1, text: '...', done: true }]
store.getters.doneTodosCount; // -> 1
store.getters.getTodoById(2); // -> { id: 2, text: '...', done: false }


```

##### Vue3 setup中使用store

```
const store = useStore();
```

##### 组件修改store的状态

组件修改store需要通过**Actions和Mutations**。

###### 在组件中通过 `dispatch`方法触发Actions，而Actions中通过 `commit` 来调用Mutations。
```
// 在组件中
store.dispatch('increment')
```

文档给出必须使用Actions的理由是：`因为限制mutations必须同步执行，而Actions可以是异步`

```
// 这个actions分发了Mutation “increment”
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

文档提供了一个处理异步Action的例子：**组合Action**

> `store.dispatch知识点` 可以处理被触发的action处理函数返回的promise，并且store.dispatch仍旧返回promise

所以我们可以通过组合多个Action来处理异步

```
// 我觉得官方的例子不够准确，所以自己写了一个
actions: {

  updateUsers({ commit, getters }) {
    return new Promise((resolve, reject) => {
      get('/api/get/users', getters.userInfo)
        .then(res => {
          commit('setUsers', res.users);
          resolve()
        }).catch(err => {
          reject()
        })
    })
  },
  updateState({ dispatch }) {
    commit('setLoading', true);
    dispatch('updateUsers').then(() => {
      commit('setLoading', false);
    }).catch(()=>{
      // error Mutations.
    })
  }
}


```

组合Action的官方用法介绍带来了很多很有趣的问题，例如以下的用法。


###### 常见的Actions错误用法

在组件调用actions时，获取数据进行处理，这个错误在我使用Vuex时候也屡屡犯下，实际上这里与其说是调用了Actions，还不如说是封装了getUsers更为准确。

```
// 在组件中
mounted(){
  store.dispatch('user/getUsers').then(res => {
    this.userList = res.userList;
  })
}

// module/user.js中
actions: {
  getUsers({commit, getters}) {
    // 假设get封装了axios
    return get('/api/get/users', getters.userInfo);
  }
}
```

> 这也引申了下面规范的 `Actions不应该返回状态`

## Vuex的规范

> 仅为个人对Vuex的文档的理解。

#### Actions不应该返回状态

因为Vuex要保证状态以可预测的方式的发生变化，当Actions返回状态给组件的时候，则打破了单向数据传输。在官方给出的图中，就很好的体现了这一点。

![](https://vuex.vuejs.org/vuex.png)

#### 通过getter或者计算属性来获取state

这种用法可以让我们从state中派生一些新状态，并且getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算（如计算属性一样）。

> 这是为了利用Vue的细粒度数据响应机制。


#### Mutations是只改变state的纯函数

没有副作用的函数叫**纯函数**。说人话，纯函数就是 **在相同的输入的情况下，都会得到相同的结果** 的函数。（即不依赖外部环境）

更简单的来说，就是不要在Mutations里引用任何外部变量，并且仅仅改变state。

> 在Vuex文档中，目录进阶 - [测试](https://vuex.vuejs.org/zh/guide/testing.html) 中提到过一句 `Mutation 很容易被测试，因为它们仅仅是一些完全依赖参数的函数。`

```
// 例如 F是纯函数, 1到n求和。

function F(n: number) {
  if ( n === 1) {
    return n;
  } else {
    return n + F(n-1)
  }
}
```

`PS：所以副作用就是指函数执行中因外部状态带来的结果变化`

## 目前Vuex带来的问题

> 仅仅代表本人在使用vuex中所感觉到的不适，因为本人水平较低，如果您觉得这个问题并不需要重视，那可能就是您水平比我高。

##### TypeScript不友好。

这问题实际上是通过`dispatch`来调用Actions所带来的，以至于我在实际使用中，必须查看一下具体module里的Actions，某些情况下也可能导致拼写错误，我觉得具有语法提示和Actions函数提示的功能将更为友好。

包括`mapState, mapActions` 都会带来此问题。

`commit同理，但使用commit时候一般都在module文件中，所以带来的困扰比较小`


下面是一种Typescript适配探究，仅抛砖引玉，欢迎讨论。
```

type UserAction = 'login' | 'logout' | 'updateInfo';

const userAction = {
  login: () => {},
  logout: () => {},
  updateInfo: () => {},
}

class MyStore<Action extends string, A = {[key in Action]: () => void;} > {
  
  action: A;
  constructor(action: A ) {
    this.action = action;
  }
  dispatch(actionFuncName: Action, ...args: any[] ) {
  }
}

let store = new MyStore<UserAction>(userAction);

store.dispatch('login', { user: '123', pwd: '234' });
```

- 这种方法利用了type来给dispatch提供了一定的Actions提示，但必须具体操作到某个modules。

##### jsDoc不友好

我还是希望在调用Actions或者Mutations时候，看到 `jsDoc` 注释。

##### 双向绑定数据略微繁琐

还是取官方的例子，这个例子也说明了，我们应当去探究非严格模式下的合理使用。
```
<input v-model="message">

computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

如果是严格模式下，那就是如下的光景了。

```
<input v-model="message">

computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.dispatch('updateMessage', value)
    }
  }
}

actions: {
  updateMessage({ commit }, value) {
    commit('updateMessage', value)
  }
}

mutations: {
  updateMessage(state, msg) {
    state.message = msg;
  }
}
```