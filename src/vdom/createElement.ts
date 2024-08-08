export function createElement(
  tagName: string,
  { attrs = {}, children = [] }: TCreateElementOption = {}
): IVdom {
  return { tagName, attrs, children };
}
