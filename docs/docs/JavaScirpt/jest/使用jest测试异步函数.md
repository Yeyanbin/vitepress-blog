
# 使用异步

## 使用异步的四种方法

1. done回调
2. 返回promise
3. 匹配器的.resolve和.reject方法
4. async & await

### done回调

```js
// done回调
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

```
若 done() 函数从未被调用，测试用例会正如你预期的那样执行失败（显示超时错误）。

若 expect 执行失败，它会抛出一个错误，后面的 done() 不再执行。 若我们想知道测试用例为何失败，我们必须将 expect 放入 try 中，将 error 传递给 catch 中的 done函数。 否则，最后控制台将显示一个超时错误失败，不能显示我们在 expect(data) 中接收的值。

> 注意： done() 不应与Promises混合，因为这会导致您测试中的内存泄漏。


```js

// 返回promise
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

```js

// 匹配器的.resolve和.reject方法
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});

// async & await
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

你也可以将 async and await和 .resolves or .rejects一起使用。

```js
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```