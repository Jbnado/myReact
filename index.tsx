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
