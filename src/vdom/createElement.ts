export function createElement(
  tagName: string,
  { attrs = {}, children = [] }: ICreateElementOption = {}
): IVdom {
  return { tagName, attrs, children };
}
