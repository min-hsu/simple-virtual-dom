export function mount($node: Element, $target: Element) {
  $target.replaceWith($node);
  return $node;
}
