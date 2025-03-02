export function renderElement({ tagName, attrs = {}, children = [] }: VDom) {
  const $el = document.createElement(tagName);

  // set attributes
  Object.entries(attrs).forEach(([k, v]) => $el.setAttribute(k, v));

  // set children
  children.forEach((child) => $el.appendChild(render(child)));

  return $el;
}

export function render(vNode: Children) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  return renderElement({
    tagName: vNode.tagName,
    attrs: vNode.attrs,
    children: vNode.children,
  });
}
