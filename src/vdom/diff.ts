import { render } from "./render";

export function diff(vOldNode: Vdom, vNewNode: Vdom) {
  if (vNewNode === undefined) {
    return ($node: TNode): TNode => {
      $node.remove();
      return undefined;
    };
  }
  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node: TNode): TNode => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  return ($node: TNode): TNode => {
    return $node;
  };
}
