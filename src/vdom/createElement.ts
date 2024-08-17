export function createElement(
  tagName: string,
  {
    attrs = {},
    children = [],
  }: Readonly<Partial<Pick<IVdom, "attrs" | "children">>> = {}
): IVdom {
  return { tagName, attrs, children };
}
