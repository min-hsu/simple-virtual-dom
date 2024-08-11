declare type Children = IVdom | string;

declare interface Vdom {
  tagName: string;
  attrs?: Props;
  children?: Array<Children>;
}

declare type CreateElementOption = Pick<Vdom, "attrs" | "children">;

declare type Props = Record<string, any>;

declare type TNode = HTMLElement | Text;
