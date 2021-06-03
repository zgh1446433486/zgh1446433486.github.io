# React生命周期

## 生命周期图谱

![An image](/reactLifeCycle.jpeg)

## constructor()

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

通常，在 React 中，构造函数**仅用于**以下两种情况：

- 通过给 this.state 赋值对象来**初始化内部 state**(不要调用 setState() 方法,需要使用内部 state，请直接在构造函数中为 this.state 赋值初始)。
- 为事件处理函数绑定实例(如果觉得使用 bind 很麻烦, 可以使用 **class fields** 正确的绑定回调函数, 使用 ```()=>{}``` 形式写function)

```js
constructor(props) {
  super(props);
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中

**避免将 props 的值复制给 state, 错误示例: this.state = { color: props.color };**

## render()

```render()``` 方法是 class 组件中**唯一必须实现**的方法。

```render()``` 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 ```componentDidMount()``` 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。

**如果 shouldComponentUpdate() 返回 false，则不会调用 render()。**

## componentDidMount()

```componentDidMount()``` 会在**组件挂载后（插入 DOM 树中）立即调用**。依赖于 DOM 节点的初始化应该放在这里。如需通过**网络请求**获取数据，此处是实例化请求的好地方。

这个方法是比较适合**添加订阅**的地方。如果添加了订阅，请不要忘记在 ```componentWillUnmount()``` 里**取消订阅**

你可以在 ```componentDidMount()``` 里**直接调用 setState()**。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 ```constructor()``` 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理

## componentDidUpdate()
```js
componentDidUpdate(prevProps, prevState, snapshot)
```
componentDidUpdate() 会在更新后会被**立即调用**。**首次渲染不会执行此方法**。

当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行**网络请求**。（例如，当 props 未发生变化时，则不会执行网络请求）。

```js
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
你也可以在 ```componentDidUpdate()``` 中直接调用 ```setState()```，但请注意它**必须被包裹在一个条件语句里**，正如上述的例子那样进行处理，否则会导致死循环。

如果 ```shouldComponentUpdate()``` 返回值为 false，则不会调用 ```componentDidUpdate()```。

## componentWillUnmount()
```componentWillUnmount()``` 会在**组件卸载及销毁之前直接调用**。在此方法中执行必要的清理操作，例如，**清除 timer**，**取消网络请求**或清除在 ```componentDidMount()``` 中创建的**订阅**等。

```componentWillUnmount()``` 中**不应调用 setState()**，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

# React不常用的生命周期方法

## shouldComponentUpdate()
```js
shouldComponentUpdate(nextProps, nextState)
```
根据 ```shouldComponentUpdate()``` 的**返回值**，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

当 props 或 state 发生变化时，```shouldComponentUpdate()``` 会在**渲染执行之前被调用**。返回值默认为 true。**首次渲染或使用 forceUpdate() 时不会调用该方法**。
内置的 PureComponent 组件 使用此方法实现。

## static getDerivedStateFromProps()
```js
static getDerivedStateFromProps(props, state)
```
getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

## getSnapshotBeforeUpdate()
```js
getSnapshotBeforeUpdate(prevProps, prevState)
```
```getSnapshotBeforeUpdate()``` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。

此生命周期的任何返回值将作为参数传递给 ```componentDidUpdate()```。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。

## static getDerivedStateFromError()
```js
static getDerivedStateFromError(error)
```
此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

```getDerivedStateFromError()``` 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。

## componentDidCatch()
```js
componentDidCatch(error, info)
```
此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

- error —— 抛出的错误。
- info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

```componentDidCatch()``` 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况