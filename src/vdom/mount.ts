export function mount($node: Element | Text, $target: Element) {
  $target.replaceWith($node);
  return $node;
}
