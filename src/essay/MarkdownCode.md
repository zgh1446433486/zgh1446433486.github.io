# Markdown语法示例

## 文本
```md
It's very easy to make some words **bold** and other
words *italic* with Markdown.
You can even [link to Google!](http://google.com)
```
#### 输出:

It's very easy to make some words **bold** and other
words *italic* with Markdown.
You can even [link to Google!](http://google.com)

## 列表
```md
Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this
```
#### 输出:

Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

## 图片
```md
If you want to embed images, this is how you do it:

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
```
#### 输出:

If you want to embed images, this is how you do it:

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

## 标题和引用
```md
# Structured documents

Sometimes it's useful to have different levels of headings to
structure your documents.
Start lines with a `#` to create headings.
Multiple `##` in a row denote smaller heading sizes.

### This is a third-tier heading

You can use one `#` all the way up to `######` six for different heading sizes.

If you'd like to quote someone, use the > character before the line:

> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
> - Captain Janeway
```
#### 输出:

# Structured documents

Sometimes it's useful to have different levels of headings to
structure your documents.
Start lines with a `#` to create headings.
Multiple `##` in a row denote smaller heading sizes.

### This is a third-tier heading

You can use one `#` all the way up to `######` six for different heading sizes.

If you'd like to quote someone, use the > character before the line:

> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
> - Captain Janeway

## 代码块

```md
There are many different ways to style code with GitHub's markdown.
If you have inline code blocks, wrap them in backticks: `var example = true`.
If you've got a longer block of code, you can indent with four spaces:

    if (isAwesome){
      return true
    }

GitHub also supports something called code fencing,
which allows for multiple lines without indentation:

`` `
if (isAwesome){
  return true
}
` ``

And if you'd like to use syntax highlighting, include the language:

`` `javascript
if (isAwesome){
  return true
}
` ``
```

#### 输出:
There are many different ways to style code with GitHub's markdown.
If you have inline code blocks, wrap them in backticks: `var example = true`.
If you've got a longer block of code, you can indent with four spaces:

    if (isAwesome){
      return true
    }

GitHub also supports something called code fencing,
which allows for multiple lines without indentation:

```
if (isAwesome){
  return true
}
```

And if you'd like to use syntax highlighting, include the language:

```javascript
if (isAwesome){
  return true
}
```
