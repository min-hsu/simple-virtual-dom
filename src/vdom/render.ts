export function renderElement({ tagName, attrs = {}, children = [] }: IVdom) {
  const $el = document.createElement(tagName);

  // set attributes
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // set children
  for (const child of children) {
    const $child = render(child);
    $el.appendChild($child);
  }

  return $el;
}

export function render(vNode: IChildren) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }
  return renderElement({
    tagName: vNode.tagName,
    attrs: vNode.attrs,
    children: vNode.children,
  });
}
