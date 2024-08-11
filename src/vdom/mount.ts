export function mount($node: TNode, $target: TNode) {
  $target.replaceWith($node);
  return $node;
}
