export function mount($node: Element | Text, $target: Element | Text) {
  $target.replaceWith($node);
  return $node;
}
