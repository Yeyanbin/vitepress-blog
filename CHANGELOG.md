# 更新日志

## 2022-08-19

目前 `vitepress` 的最新版本是 `1.0.0-alpha.8` 但是最新版本在构建的时候会报错，我已经向官方提交了 [issues](https://github.com/vuejs/vitepress/issues/1209)，等待解决中

## 2022-08-18

- 更新了 `vitepress` 版本
- 更新主题目录别名，在 `vitepress 1.0.0-alpha.5` 版本前的别名为 `/@theme` 现跟新为 `@theme`，详情参考 [CHANGELOG.md](https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md)
- 优化了配置文件的位置，`vite.config.ts` 放在根目录是不生效的，必须放在 `/docs` 目录下才可以生效
- 修复了打包的报错信息：

```shell
This rule cannot come before a "@charset" rule

  <stdin>:2:0:
    2 │ .f-main[data-v-8221e4b8] {
      ╵ ^
```

在 `vite.config.ts` 中添加了如下配置：

```ts
css: {
  postcss: {
    plugins: [
      {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove()
            }
          },
        },
      },
    ]
  }
}
```