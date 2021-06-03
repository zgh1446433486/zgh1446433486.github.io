# React 中组件间通信的几种方式

组件间不同的嵌套关系，会导致不同的通信方式。常见的有：父组件向子组件通信、子组件向父组件通信、没有嵌套关系的组件之间的通信，还有一种特殊形式：跨级组件通信。

## 1、父组件向子组件通信

这是 React 中最为常见的一种通信方式，父组件通过 props 向子组件传递需要的信息

```js
class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child name="Bob" />
      </div>
    );
  }
}

class Child extends React.Component {
  render() {
    const { name } = this.props;
    return <p>hello, {name}</p>;
  }
}
```

## 2、子组件向父组件通信

子组件向父组件通信有两种方式：

- 利用回调函数
- 利用自定义事件机制

相较而言回调函数更为简单，一般多用这种方式。其原理为：父组件将一个函数作为 props 传递给子组件，子组件调用这个回调函数，将想要传递的信息，作为参数，传递给父组件。

```js
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleClick = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ display: this.state.visible ? "block" : "none" }}>我是被隐藏的文字</div>
        <Child name="Bob" handleClick={this.handleClick} />
      </React.Fragment>
    );
  }
}
class Child extends React.Component {
  render() {
    const { handleClick } = this.props;
    return <button onClick={handleClick}>点击显示隐藏的文字</button>;
  }
}
```

## 3、跨级组件通信

跨级组件通信有两种方法：

- 向层层传递 props
- 利用 context

对于第一种方式，如果组件结构较深，那么中间每一层都需要传递 props,增加了复杂度且造成了冗余。而 context 相当于一个全局变量，是一个大容器，我们可以把要通信的内容放在这个容器中，这样一来，不管嵌套有多深，都可以随意取用。使用 context 也很简单，需要满足两个条件：

- 上级组件要声明自己支持 context，并提供一个函数来返回相应的 context 对象
- 子组件要声明自己需要使用 context

```js
const myContent = React.createContext({
  callback: (msg) => {
    console.log(msg);
  },
});

class GrandParent extends React.Component {
  render() {
    return <Parent />;
  }
}
GrandParent.contextType = myContent;

const Parent = () => {
  return (
    <div>
      <Child />
    </div>
  );
};

class Child extends React.Component {
  static contextType = myContent;
  handleConsoleLog = (msg) => {
    return () => {
      this.context.callback(msg);
    };
  };
  render() {
    return <button onClick={this.handleConsoleLog("传给父组件的数据")}>点击我</button>;
  }
}
```

父组件向子组件单向通信，可以使用变量
子组件想向父组件通信，同样可以由父组件提供一个回调函数，供子组件调用，回传参数。

Context 就像全局变量一样，而全局变量正是导致应用走向混乱的罪魁祸首之一，给组件带来了外部依赖的副作用，因此，不推荐使用 context。其比较好的应用场景是：真正意义上的全局信息且不会更改，如界面主题，用户信息。总体原则是：如果真的需要使用，建议写成高阶组件来实现。

## 4、没有嵌套关系的组件通信

没有嵌套关系的组件通信包括兄弟组件通信和不在同一个父级中的非兄弟组件。同样有两种通信方式：

- 利用二者共同父组件的 context 对象进行通信
- 利用自定义事件

第一种方法利用父组件中转，会增加子组件和父组件之间的耦合度，如果组件层次较深，找到二者公共父组件不太容易。一般使用自定义事件实现。
自定义事件需要借用 node.js 的 events 模块：

```js
// 安装
npm install events --save
// 引入
import { EventEmitter } from "events";
// 初始化实例并输出给其他组件使用
export default new EventEmitter();
```

```js
export default class App extends Component {
  render() {
    return (
      <div>
        <Foo />
        <Boo />
      </div>
    );
  }
}

export default class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
    };
  }
  componentDidMount() {
    // 声明一个自定义事件
    this.eventEmitter = emitter.on("callMe", (msg) => {
      this.setState({
        msg,
      });
    });
  }
  // 组件销毁前移除事件监听
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitter);
  }
  render() {
    return (
      <div>
        {this.state.msg}
        我是非嵌套 1 号
      </div>
    );
  }
}

export default class Boo extends Component {
  render() {
    const cb = (msg) => {
      return () => {
        // 触发自定义事件。参一为事件名，后面为传递给事件的参数，可多个。
        emitter.emit("callMe", "Hello");
      };
    };
    return (
      <div>
        我是非嵌套 2 号<button onClick={cb("blue")}>点击我</button>
      </div>
    );
  }
}
```

## 5、总结
几种通信情况下，最适用的方式：
- 父组件向子组件通信：使用 props
- 子组件向父组件通信：使用 props 回调
- 跨级组件间通信：使用 context 对象
- 非嵌套组件间通信：使用事件订阅