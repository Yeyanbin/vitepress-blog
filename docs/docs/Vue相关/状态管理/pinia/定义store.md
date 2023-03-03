# defineStore做了什么？

```js
function defineStore(
  idOrOptions: any,
  setup?: any,
  setupOptions?: any
) {
  // 兼容多种使用方式
  const isSetupStore = typeof setup === 'function'
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    // the option store setup will contain the actual options in this case
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }

  function useStore() { /* 下一节再看 */}

  useStore.$id = id

  return useStore
}
```

# useStore做了什么？

```js
function useStore(pinia?: Pinia | null, hot?: StoreGeneric): StoreGeneric {
  const currentInstance = getCurrentInstance()
  pinia =
    // 在测试模式, 忽略这个参数 ignore the argument provided as we can always retrieve a
    // pinia实例 通过 getActivePinia() 获取
    (__TEST__ && activePinia && activePinia._testing ? null : pinia) ||
    (currentInstance && inject(piniaSymbol))
  if (pinia) setActivePinia(pinia)

  if (__DEV__ && !activePinia) {
    throw new Error(
      `[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n` +
        `\tconst pinia = createPinia()\n` +
        `\tapp.use(pinia)\n` +
        `This will fail in production.`
    )
  }

  pinia = activePinia!

  if (!pinia._s.has(id)) {
    // 创造store，通过两种不同的用法
    if (isSetupStore) {
      createSetupStore(id, setup, options, pinia)
    } else {
      createOptionsStore(id, options as any, pinia)
    }

    /* istanbul ignore else */
    if (__DEV__) {
      // @ts-expect-error: not the right inferred type
      useStore._pinia = pinia
    }
  }

  const store: StoreGeneric = pinia._s.get(id)!

  if (__DEV__ && hot) {
    const hotId = '__hot:' + id
    const newStore = isSetupStore
      ? createSetupStore(hotId, setup, options, pinia, true)
      : createOptionsStore(hotId, assign({}, options) as any, pinia, true)

    hot._hotUpdate(newStore)

    // cleanup the state properties and the store from the cache
    delete pinia.state.value[hotId]
    pinia._s.delete(hotId)
  }

  // save stores in instances to access them devtools
  if (
    __DEV__ &&
    IS_CLIENT &&
    currentInstance &&
    currentInstance.proxy &&
    // avoid adding stores that are just built for hot module replacement
    !hot
  ) {
    const vm = currentInstance.proxy
    const cache = '_pStores' in vm ? vm._pStores! : (vm._pStores = {})
    cache[id] = store
  }

  // StoreGeneric cannot be casted towards Store
  return store as any
}

```