type CreateElement = (
  tagName: string,
  options?: { attrs?: VDom["attrs"]; children?: VDom["children"] }
) => VDom;

export const createElement: CreateElement = (
  tagName,
  { attrs = {}, children = [] } = {}
) => ({ tagName, attrs, children });
