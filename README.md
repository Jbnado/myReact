# My React

### My react is my study to understand how react works.

So I'm using `Typescript` as my language (but you can choose it), using `Parcel` as web bundler and I will install all the packages and libraries that we will need with `Yarn`.

If you don't know Yarn yet, so let me try to explain this: Yarn is a package manager of JavaScript codes, so it allows us to use all the libraries that are available around the world and I can share my libraries too. Also using yarn we will be able to write some scripts to quickly use parcel build or whatever.

Typescript is a typed programming language, is a superset of JavaScript, recommended for large and scallable applications/software.

Parcel is a web bundler that will build our application fast as it can!

So I installed these as developer dependencies using Yarn.

```npm
yarn add typescript parcel -D
```

Okay, now that we have typescript let's create a tsconfig. The tsconfig indicates the root of our project and indicates that it's a Typescript project. It also specifies the compiler options required to compile the project.

Knowing this, let's say that we have some jsx and it's react using it and let's turn off strictness.

In `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "jsx": "react",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "skipLibCheck": true
  }
}
```

I will need more two files: `index.html` and `index.tsx`.

In html no magic, just it for now:

```html
<script src="index.tsx"></script>
```

Ok, now let's serve this project so:

```yarn
yarn parcel index.html
```

Open it in your localhost and we will have a blank page!
![](https://github.com/Jbnado/screenshotsMyReact/blob/main/Blank_Page.png)

Now in index.tsx we can create some jsx lines:

```tsx
const div = <div>Hello World</div>;
```

Then we will get this error:

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/ReactIsNotDefined.png)

React is not defined. Because we didn't imported React from React of course! But we are here to create our React, so:

```tsx
let React = {};

const div = <div>Hello World</div>;
```

But now React.createElement is not a Function:

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/ReactCreateElementIsNotAFunction.png)

So now we know that the const div is calling the createElement function, so let's create this function:

```tsx
let React = {
  createElement: () => {},
};

const div = <div>Hello World</div>;
```

Now we don't have any errors, but also we are getting nothing! So let's see the arguments of this function:

```tsx
let React = {
  createElement: (...args) => {
    console.log(args);
  },
};

const div = <div>Hello World</div>;
```

And look at this:

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/ConsoleLogArgs.png)

We have three args here.
Div that we are passing as our html element, null and Hello World that is our children, so what's null?

Yeah, it's the props:

```tsx
let React = {
  createElement: (...args) => {
    console.log(args);
  },
};

const div = <div className="rpjs">Hello World</div>;
```

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/ConsoleLogArgsProps.png)

Okay, now Let's try to create more elements:

```tsx
let React = {
  createElement: (...args) => {
    console.log(args);
  },
};

const div = (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);
```

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/ConsoleLogSomeUndefinedsInDivRoot.png)

Now we are receiving our elements in some arrays but in our div root we have some undefineds, what's going on here?

In our createElement we are just showing in console the args, but I'm assuming it creates and returns an element, so let's try to return something here.

Let's create an element and destruct the args that we are receiving:

```tsx
let React = {
  createElement: (tag, props, ...children) => {
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};

const div = (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);
```

So now we have a tag, props and childrens coming, and we create the element using this tag, this props and the props and the childrens that element has. And we are showing this in the console and then returning it, and look at this:

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/ReturningElement.png)

Now we can see the elements coming, we see that div has 2 childrens, a className, and if I look at the children inside this div it has a lot of properties too, and the children can have childrens... We are looking for a tree! And our div is the father, is the root element!

What else is a tree? The DOM is a tree! We are now looking to the Virtal DOM, it's nothing more then a object with childrens!

There is no magic here. Of course, React uses more things like the reconciliation and Fiber that we will discuss later, but for now, let's just continue to explore it. We are doing just console.log, let's try to put this on the screen.

This code is not a React Component yet. And why?

```tsx
const div = (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);
```

Yes! Because React Components are functions or classes, so let's do our div a React Component:

```tsx
const Div = () => (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);
```

But now you will notice that are no more console.logs, because now our tag is a function. So we need to handle this:

```tsx
let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};
```

Here we get the tag, we see if it's a function, if it is we will return the tag with their props as a function! Simple like this.
But there are no one console.log yet! That's because we are not using our React Component:

```tsx
let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};

const Div = () => (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);

<Div />;
```

And another time we can see our Virtual DOM on console.log.
But we still not showing in the screen, so let's use the `render()` function of React to render our Div, so we will need to change our html file:

```html
<div id="app"></div>
<script src="index.tsx"></script>
```

and now we just need to render our Div inside app:

```tsx
let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};

const Div = () => (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);

render(<Div />, document.querySelector("#app"));
```

Yeah, of course! Our render is not defined:

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/RenderIsNotDefined.png)

So let's create it:

```tsx
let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};

const Div = () => (
  <div className="rpjs">
    <h1>Hello, people!</h1>
    <p>Thanks to be here today!</p>
  </div>
);

const render = (reactElementOrStringOrNumber, container) => {
  if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }

  const actualDomElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );

  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter((props) => props !== "children")
      .forEach(
        (props) =>
          (actualDomElement[props] = reactElementOrStringOrNumber[props])
      );
  }

  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach((child) =>
      render(child, actualDomElement)
    );
  }

  container.appendChild(actualDomElement);
};

render(<Div />, document.querySelector("#app"));
```

Yeah, it's pretty big. Let's understand this:

So our render function will receive two things: a react element, or a string, or a number, and a container.

```tsx
const render = (reactElementOrStringOrNumber, container) => {...someLogicHere}
```

If the first parameter is a string or a number, what we will do is just append in the container, so we need to stop here our render function.

```tsx
if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
  container.appendChild(
    document.createTextNode(String(reactElementOrStringOrNumber))
  );
  return;
}
```

If it's not a string or a number it will be a react element, so let's create a tag with it and save in the actualDomElement.

```tsx
const actualDomElement = document.createElement(
  reactElementOrStringOrNumber.tag
);
```

Now we have the actual dom element that we created using the tag of our react element.

If that react element has some props we will get all the keys and filter it, because we don't want to get the childrens, we want just the props of that tag. Getting just the props we just need to iterate over it and put the props in that tag.

```tsx
if (reactElementOrStringOrNumber.props) {
  Object.keys(reactElementOrStringOrNumber.props)
    .filter((props) => props !== "children")
    .forEach(
      (props) => (actualDomElement[props] = reactElementOrStringOrNumber[props])
    );
}
```

Now we can see if that react element has childrens, and if it has we need to render it too, but our react element, or string, or number will be the child, and the container our actual dom element.

```tsx
if (reactElementOrStringOrNumber.props.children) {
  reactElementOrStringOrNumber.props.children.forEach((child) =>
    render(child, actualDomElement)
  );
}
```

Now we put all this inside the container using appendChild.

```tsx
container.appendChild(actualDomElement);
```

Voilá! Now we are abble to show our JSX in screen:

![](https://github.com/Jbnado/screenshotsMyReact/blob/main/RenderInScreen.png)
