# 过滤器 filter

> 主要作用是将数据做一些格式化的显示，比如

10 => $10
abc => ABC
abc => Abc
10 => 10元

## 使用步骤

1. 定义
  1. 全局
  2. 局部

2. 使用

## 使用 一根竖线

假如有个过滤器叫做 a

```html
<p>{{ name | a }}</p>
```

## 全局定义

```js
Vue.filter(filterName, callback)
// filterName - 过滤器的名字
// callback   - 过滤器的逻辑操作，必须要有返回值
//        - value   要过滤显示的数据
```

## 局部定义, 配置组件的 filters 配置项

```js
{
  filters: {
    // key: value
    //      key - 过滤器的名字
    //      value - 过滤器的逻辑操作，必须要有返回值
    //        - value   要过滤显示的数据
  }
}
```

