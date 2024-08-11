export function createElement(
  tagName: string,
  { attrs = {}, children = [] }: CreateElementOption = {}
): Vdom {
  return { tagName, attrs, children };
}
