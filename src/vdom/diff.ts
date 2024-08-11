import { render } from "./render";

function diffAttrs(oldAttrs: Props, newAttrs: Props) {
  const patches: Array<($node: HTMLElement) => void> = [];
  // set new attributes
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node: HTMLElement) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // remove old attributes
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node: HTMLElement) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node: TNode) => {
    patches.forEach((patch) => {
      patch($node as HTMLElement);
    });
  };
}

function diffChildren(oldChildren: Children, newChildren: Children) {
  return ($node: TNode): TNode => {
    return $node;
  };
}

export function diff(vOldNode: Vdom, vNewNode: Vdom) {
  if (vNewNode === undefined) {
    return ($node: TNode): TNode | undefined => {
      $node.remove();
      return undefined;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return ($node: TNode): TNode => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    }

    return () => undefined;
  }
  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node: TNode): TNode => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs!, vNewNode.attrs!);
  // const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node: TNode): TNode => {
    patchAttrs($node);
    // patchChildren($node);

    return $node;
  };
}
