
# Schema属性处理提案

## 设想

提供较为全面的对属性处理的能力，并依据已知的痛点进行优化。

以本鶸比较熟悉的配置化表单为着力点，对齐前后台痛点，赋能产品同学，为其提供表单的操作能力，自己动手快速响应完善业务逻辑，解放前端人力。
（编不下去了，大概是这个意思。）

- 例如拖拽式表单项，可视化配置。
  - 每一个表单具有唯一的key值
  - 前端可通过表单key获取具体的表单配置json

### content内容

```json
[
  {
    "component": "input",
    "label": {
      "expression": "{type}",
      "map": "{TITLE_TYPE_MAP}",
      "value": "操作备注",
      "type": "string"
    },
    "prop": "remark"
  },
  {
    "component": "select",
    "label": "选项",
    "prop": "type",
    "options": {
      "type": "array",
      "expression": "{typeOptions}",
      "for": [
        { "key": "label", "value": "name", "default": "选项的默认值" },
        { "key": "value", "value": "id", "default": "0", "type": "number" },
      ]
    }
  }
]
```

### state状态池

```json

{
  "DEFAULT_TITLE": "操作备注",
  "TITLE_TYPE_MAP": {
    "1": "新增备注",
    "2": "删除备注",
    "3": "查找备注",
    "4": "修改备注",
  },
  "typeOptions": [
    { "id": 1, "name": "新增备注" },
    { "id": 2, "name": "删除备注" },
    { "id": 3, "name": "查找备注" },
    { "id": 4, "name": "修改备注" }
  ]
}
```

## 用一个对象来表示值

### 类型的处理 type

#### 遇到的问题

> 用户在input输入的时候，只能是字符串，例如 true, false

之前在研究json化的时候发现了一个问题，我们是很难确定一个值是什么类型的，因此在具体业务中，我们常常
需要做类型转换，这将花费大量的时间成本。（例如与后台同学做联调）

例如，size的类型是number，而id的类型是string。我们并不能将所有可以转化为number类型的string都做转换，所以，上述的设计也可以解决此问题。

```json
{
  "size": "120",
  "id": "1",
}
```

#### 解决例子

```json
{
  "size": {
    "value": "120",
    "type": "number"
  },
  "id": "1",
  "is_comfirm": {
    "value": "true",
    "type": "boolean"
  }
}
```

#### 注意事项

默认的类型应该是字符串，也就是下面三个`name`是等价的

```json
{
  "name": "张三"
}

{
  "name": {
    "value": "张三",
    "type": "string"
  }
}

{
  "name": {
    "value": "张三",
  }
}
```

### 值对象和表达式的引入

为了获得更完善的自定义能力，使用表达式是必须的，具体的表达式原理可以阅读隔壁的逆波兰表达式文章，这里不展开描述了，反正原理是逆波兰表达式的使用。

#### 对于任意值都可以使用值对象来处理

  1. 发现一个值, 判断是否字符串, 是则直接赋值
  2. 否则 ，查看是否带有`value`或者`expression`属性，是则认为这个字段当成特殊的对象值做处理
  3. 否则，当普通对象处理。

#### 对于一个值对象可能有的属性

- `value`：默认值
- `expression`：表达式，和`value`二选一，同时存在的时候优先级比`value`高
- `type`：类型，默认为 `string`
- `for`：数组的处理方案
- `map`：映射方案，会把值映射展示，仅供展示。

#### 数组的处理方案

当type的值为`array`的时候，则需要`for`，使用如下方案kv对应，配置数组中元素的属性。

```json
// in schema
{
  "component": "select",
  "label": "选项",
  "prop": "type",
  "options": {
    "type": "array",
    "expression": "{typeOptions}",
    "for": [
      { "key": "label", "value": "name", "default": "选项的默认值" },
      { "key": "value", "value": "id", "type": "number" },
      { "key": "width", "value": "500px"}
    ]
  }
}

// in state
{
  "typeOptions": [
    { "id": 1, "name": "新增备注" },
    { "id": 2, "name": "删除备注" },
    { "id": 3, "name": "查找备注" },
    { "id": 4, "name": "修改备注" }
  ]
}

// 相当于
{
  "component": "select",
  "label": "选项",
  "prop": "type",
  "options": [
    { "label": "新增备注", "value": 1, "width": "500px"}
    { "label": "删除备注", "value": 2, "width": "500px"}
    { "label": "查找备注", "value": 3, "width": "500px"}
    { "label": "修改备注", "value": 4, "width": "500px"}
  ]
}

```
