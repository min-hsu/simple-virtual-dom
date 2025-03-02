import { render } from "./render";

function zip<T, U>(
  xs: T extends Node ? NodeListOf<T> : Array<T>,
  ys: U extends Node ? NodeListOf<U> : Array<U>
): Array<[T, U]> {
  const zipped: Array<[T, U]> = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
}

function diffAttrs(oldAttrs: Props, newAttrs: Props) {
  const patches: Array<($node: HTMLElement) => void> = [];
  // set new attributes
  Object.entries(newAttrs).forEach(([k, v]) => {
    patches.push(($node: HTMLElement) => {
      $node.setAttribute(k, v);
      return $node;
    });
  });

  // remove old attributes
  Object.keys(oldAttrs).forEach((key) => {
    if (!(key in newAttrs)) {
      patches.push(($node: HTMLElement) => {
        $node.removeAttribute(key);
        return $node;
      });
    }
  });

  return ($node: TNode) => {
    patches.forEach((patch) => {
      patch($node as HTMLElement);
    });
  };
}

function diffChildren(oldChildren: Array<VDom>, newChildren: Array<VDom>) {
  const childrenPatches: Array<($node: HTMLElement) => void> = [];
  zip<VDom, VDom>(oldChildren, newChildren).forEach(([oldChild, newChild]) => {
    childrenPatches.push(diff(oldChild, newChild));
  });

  const additionalPatches: Array<($node: TNode) => void> = [];
  newChildren.slice(oldChildren.length).forEach((child) => {
    additionalPatches.push(($node: TNode) => {
      $node.appendChild(render(child));
      return $node;
    });
  });

  return ($parent: TNode): TNode => {
    if ($parent.childNodes.length > newChildren.length) {
      [...$parent.childNodes]
        .slice(newChildren.length)
        .forEach(($node) => $node.remove());
    }

    zip<($node: HTMLElement) => void, ChildNode>(
      childrenPatches,
      $parent.childNodes
    ).forEach(([patch, child]) => {
      patch(child as HTMLElement);
    });

    additionalPatches.forEach((patch) => patch($parent));

    return $parent;
  };
}

export function diff(vOldNode: VDom, vNewNode: VDom) {
  if (vNewNode === undefined) {
    return ($node: TNode): undefined => {
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
  const patchChildren = diffChildren(
    vOldNode.children as Array<VDom>,
    vNewNode.children as Array<VDom>
  );

  return ($node: TNode): TNode => {
    patchAttrs($node);
    patchChildren($node);

    return $node;
  };
}
