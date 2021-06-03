# React 顶层 API

## 组件
### React.Component
```React.Component``` 是使用 ES6 classes 方式定义 React 组件的基类

### React.PureComponent
```React.PureComponent``` 与 ```React.Component``` 很相似。两者的区别在于 ```React.Component``` 并未实现 ```shouldComponentUpdate()```，而 ```React.PureComponent``` 中以浅层对比 prop 和 state 的方式来实现了该函数。

在某些情况下使用 ```React.PureComponent``` 可提高性能。

```React.PureComponent``` 中的 ```shouldComponentUpdate()``` **仅作对象的浅层比较**。如果对象中包含复杂的数据结构，则有可能因为**无法检查深层的差别**，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 ```React.PureComponent```，或者在深层数据结构发生变化时调用 **forceUpdate()** 来确保组件被正确地更新。

### React.memo
```React.memo``` 为高阶组件。它与 ```React.PureComponent``` 非常相似，但只适用于函数组件，而不适用 class 组件。

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 ```React.memo``` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```React.memo``` 仅检查 props 变更。如果函数组件被 ```React.memo``` 包裹，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。

## 创建 React 元素
### createElement()
```js
React.createElement(
  type,
  [props],
  [...children]
)
```
创建并返回指定类型的新 React 元素。其中的类型参数既可以是标签名字符串（如 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

使用 JSX 编写的代码将会被转换成使用 ```React.createElement()``` 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 ```React.createElement()```。

## 转换元素
### cloneElement()
```js
React.cloneElement(
  element,
  [props],
  [...children]
)
```
以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。

### isValidElement()
```js
React.isValidElement(object)
```
验证对象是否为 React 元素，返回值为 true 或 false。

### React.Children
```React.Children``` 提供了用于处理 ```this.props.children``` 不透明数据结构的实用方法。
#### React.Children.map
```js
React.Children.map(children, function[(thisArg)])
```
在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。

#### React.Children.forEach
```js
React.Children.forEach(children, function[(thisArg)])
```
与 ```React.Children.map()``` 类似，但它不会返回一个数组。

#### React.Children.count
```js
React.Children.count(children)
```
返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。

#### React.Children.only
```js
React.Children.only(children)
```
验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。

#### React.Children.toArray
```js
React.Children.toArray(children)
```

## Fragments
### React.Fragment
```React.Fragment``` 组件能够在不额外创建 DOM 元素的情况下，让 ```render()``` 方法中返回多个元素。
```js
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
你也可以使用其简写语法 <></>。

## Refs
### React.createRef
```React.createRef``` 创建一个能够通过 ref 属性附加到 React 元素的 ref。
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

### React.forwardRef
```React.forwardRef``` 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs

```React.forwardRef``` 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
在上述的示例中，React 会将 ```<FancyButton ref={ref}>``` 元素的 ref 作为第二个参数传递给 ```React.forwardRef``` 函数中的渲染函数。该渲染函数会将 ref 传递给 ```<button ref={ref}>``` 元素。

因此，当 React 附加了 ref 属性之后，ref.current 将直接指向 ```<button>``` DOM 元素实例。

## Suspense
### React.lazy
```React.lazy()``` 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
```js
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```
请注意，渲染 lazy 组件依赖该组件渲染树上层的 ```<React.Suspense>``` 组件。这是指定加载指示器（loading indicator）的方式。

### React.Suspense
```React.Suspense``` 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。目前，懒加载组件是 ```<React.Suspense>``` 支持的唯一用例：
```js
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```
